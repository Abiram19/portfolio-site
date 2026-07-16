import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

interface ValidationError {
  field: string;
  message: string;
}

// ─── In-memory rate limiter ───────────────────────────────────────────────────
// Simple per-IP sliding window. Resets on server restart (serverless-safe for
// most cases; swap for Redis/Upstash if you need persistence across cold starts).
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3;               // max 3 submissions per IP per minute

const ipMap = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipMap.get(ip);

  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    // New window
    ipMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  record.count += 1;
  return false;
}

// ─── Server-side validation ───────────────────────────────────────────────────
function validate(payload: ContactPayload): ValidationError[] {
  const errors: ValidationError[] = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name) {
    errors.push({ field: "name", message: "Full name is required." });
  } else if (name.length < 2) {
    errors.push({ field: "name", message: "Name must be at least 2 characters." });
  } else if (name.length > 100) {
    errors.push({ field: "name", message: "Name must be under 100 characters." });
  }

  if (!email) {
    errors.push({ field: "email", message: "Email address is required." });
  } else if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Please enter a valid email address." });
  } else if (email.length > 254) {
    errors.push({ field: "email", message: "Email address is too long." });
  }

  if (!message) {
    errors.push({ field: "message", message: "Message is required." });
  } else if (message.length < 10) {
    errors.push({ field: "message", message: "Message must be at least 10 characters." });
  } else if (message.length > 5000) {
    errors.push({ field: "message", message: "Message must be under 5000 characters." });
  }

  return errors;
}

// ─── Sanitise text to prevent email injection ─────────────────────────────────
function sanitize(str: string): string {
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/&/g, "&amp;")
    .trim();
}

// ─── HTML email template ──────────────────────────────────────────────────────
function buildEmailHtml(
  name: string,
  email: string,
  message: string,
  timestamp: string
): string {
  const safeMessage = sanitize(message).replace(/\n/g, "<br/>");
  const safeName = sanitize(name);
  const safeEmail = sanitize(email);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Portfolio Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#111318;border-radius:16px;border:1px solid rgba(255,255,255,0.07);overflow:hidden;max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#00E5FF10,#7CFF6B08);padding:32px 40px 28px;border-bottom:1px solid rgba(255,255,255,0.06);">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
                <div style="width:8px;height:8px;border-radius:50%;background:#7CFF6B;box-shadow:0 0 10px rgba(124,255,107,0.8);"></div>
                <span style="font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:rgba(0,229,255,0.6);font-family:monospace;">NEW TRANSMISSION</span>
              </div>
              <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">
                New Portfolio Inquiry
              </h1>
              <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.35);">
                From ${safeName} — ${safeEmail}
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">

              <!-- Sender details -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:20px;margin-bottom:24px;">
                <tr>
                  <td style="padding-bottom:12px;">
                    <span style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(0,229,255,0.5);font-family:monospace;">SENDER INFO</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="80" style="font-size:11px;color:rgba(255,255,255,0.3);padding-bottom:8px;">Name</td>
                        <td style="font-size:13px;color:rgba(255,255,255,0.85);font-weight:600;padding-bottom:8px;">${safeName}</td>
                      </tr>
                      <tr>
                        <td width="80" style="font-size:11px;color:rgba(255,255,255,0.3);padding-bottom:8px;">Email</td>
                        <td style="padding-bottom:8px;">
                          <a href="mailto:${safeEmail}" style="font-size:13px;color:#00E5FF;text-decoration:none;font-weight:600;">${safeEmail}</a>
                        </td>
                      </tr>
                      <tr>
                        <td width="80" style="font-size:11px;color:rgba(255,255,255,0.3);">Sent at</td>
                        <td style="font-size:12px;color:rgba(255,255,255,0.45);font-family:monospace;">${timestamp}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <div style="margin-bottom:8px;">
                <span style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(0,229,255,0.5);font-family:monospace;">MESSAGE</span>
              </div>
              <div style="background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:20px;">
                <p style="margin:0;font-size:14px;line-height:1.7;color:rgba(255,255,255,0.72);">${safeMessage}</p>
              </div>

              <!-- Reply CTA -->
              <div style="margin-top:28px;text-align:center;">
                <a href="mailto:${safeEmail}?subject=Re: Portfolio Inquiry"
                  style="display:inline-block;background:linear-gradient(135deg,#00E5FF,#7CFF6B);color:#060d12;font-size:13px;font-weight:700;padding:12px 28px;border-radius:10px;text-decoration:none;letter-spacing:0.02em;">
                  Reply to ${safeName}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.05);text-align:center;">
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.18);font-family:monospace;">
                // Portfolio Contact System · abiram0619@gmail.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// ─── Plain-text fallback ──────────────────────────────────────────────────────
function buildEmailText(
  name: string,
  email: string,
  message: string,
  timestamp: string
): string {
  return [
    "New Portfolio Inquiry",
    "=====================",
    "",
    `Name:         ${name}`,
    `Email:        ${email}`,
    `Submitted At: ${timestamp}`,
    "",
    "Message:",
    "--------",
    message,
    "",
    "---",
    "Portfolio Contact System",
  ].join("\n");
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. Resolve client IP for rate limiting
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = (forwarded ? forwarded.split(",")[0] : "unknown").trim();

  // 2. Rate limiting
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please wait a minute before trying again." },
      { status: 429 }
    );
  }

  // 3. Parse JSON body
  let payload: ContactPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  // 4. Server-side validation
  const errors = validate(payload);
  if (errors.length > 0) {
    return NextResponse.json(
      { success: false, error: errors[0].message, errors },
      { status: 422 }
    );
  }

  // 5. Check environment variables
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "abiram0619@gmail.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
  const fromName = process.env.CONTACT_FROM_NAME ?? "Portfolio Contact Form";

  if (!apiKey || apiKey === "re_your_api_key_here") {
    console.error("[contact] RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { success: false, error: "Email service is not configured. Please try again later." },
      { status: 503 }
    );
  }

  // 6. Build email content
  const name = payload.name.trim();
  const email = payload.email.trim().toLowerCase();
  const message = payload.message.trim();
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Colombo",
    dateStyle: "full",
    timeStyle: "short",
  });

  // 7. Send via Resend
  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [toEmail],
      replyTo: `${name} <${email}>`,
      subject: `New Portfolio Inquiry from ${name}`,
      html: buildEmailHtml(name, email, message, timestamp),
      text: buildEmailText(name, email, message, timestamp),
    });

    if (error) {
      console.error("[contact] Resend API error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send message. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

// Block all non-POST methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
