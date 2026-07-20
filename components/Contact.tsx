"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { channels } from "@/lib/data/contact";
import { profile } from "@/lib/data/profile";

// ── Glassmorphism input ────────────────────────────────────────────────────────
function GlassInput({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  multiline = false,
  rows = 5,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);

  const baseStyle: React.CSSProperties = {
    width: "100%",
    background: focused ? "rgba(0,229,255,0.03)" : "rgba(255,255,255,0.03)",
    backdropFilter: "blur(20px)",
    border: `1px solid ${focused ? "rgba(0,229,255,0.45)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: "12px",
    padding: "14px 18px",
    color: "rgba(255,255,255,0.88)",
    fontSize: "13px",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    outline: "none",
    resize: "none" as const,
    transition: "border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
    boxShadow: focused
      ? "0 0 0 1px rgba(0,229,255,0.2), 0 0 28px rgba(0,229,255,0.09), inset 0 0 20px rgba(0,229,255,0.03)"
      : "none",
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[11px] font-mono tracking-[0.28em] uppercase"
        style={{
          color: focused ? "rgba(0,229,255,0.7)" : "rgba(255,255,255,0.3)",
          transition: "color 0.3s",
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
          required
          aria-required="true"
          className="placeholder:text-white/20"
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
          required
          aria-required="true"
          className="placeholder:text-white/20"
        />
      )}
    </div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────────
export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Client-side validation ────────────────────────────────────────────────
  const getValidationError = (): string | null => {
    if (!name.trim() || name.trim().length < 2)
      return "Full name must be at least 2 characters.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return "Please enter a valid email address.";
    if (!message.trim() || message.trim().length < 10)
      return "Message must be at least 10 characters.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side guard before hitting the API
    const clientError = getValidationError();
    if (clientError) {
      setError(clientError);
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(
          data.error ?? "Failed to send message. Please try again later."
        );
        return;
      }

      // Clear fields and show success screen
      setName("");
      setEmail("");
      setMessage("");
      setSent(true);
    } catch {
      setError("Failed to send message. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: {
      duration: 0.65,
      delay: 0.1 + i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  });

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-t border-white/5"
      style={{ padding: "clamp(80px, 12vw, 160px) 0" }}
    >
      {/* ── Background effects ──────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.022) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,229,255,0.055) 0%, transparent 60%)",
          filter: "blur(80px)",
          transform: "translate(20%, -20%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 60%)",
          filter: "blur(80px)",
          transform: "translate(-25%, 25%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124,255,107,0.03) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      <div
        className="relative page-container"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        {/* ── Section header ─────────────────────────────────────────────── */}
        <div className="mb-16 md:mb-20 text-center">
          <motion.div
            {...stagger(0)}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span
              className="h-px w-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(0,229,255,0.5))",
              }}
            />
            <span
              className="text-[10px] font-mono tracking-[0.42em] uppercase"
              style={{ color: "rgba(0,229,255,0.65)" }}
            >
              ESTABLISH CONNECTION
            </span>
            <span
              className="h-px w-10"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,229,255,0.5), transparent)",
              }}
            />
          </motion.div>

          <motion.h2
            id="contact-heading"
            {...stagger(1)}
            className="font-black text-white leading-[1.06] tracking-tight"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4.2rem)" }}
          >
            Let&apos;s Build Something{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #00E5FF 0%, #7CFF6B 100%)",
              }}
            >
              Extraordinary.
            </span>
          </motion.h2>

          <motion.p
            {...stagger(2)}
            className="mt-6 text-base md:text-lg leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.38)",
              maxWidth: "640px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            I&apos;m always interested in discussing software engineering
            opportunities, full-stack development projects, innovative products,
            startup ideas, and technology-driven collaborations.
          </motion.p>
        </div>

        {/* ── Two-column layout ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.45fr] gap-8 lg:gap-14 items-start">
          {/* ── LEFT — Communication channels ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.35,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex flex-col gap-4"
          >
            <div className="mb-2">
              <p
                className="text-[10px] font-mono tracking-[0.35em] uppercase mb-2"
                style={{ color: "rgba(0,229,255,0.4)" }}
              >
                COMMUNICATION CHANNELS
              </p>
              <div
                className="h-px w-full"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />
            </div>

            {channels.map((ch, i) => (
              <motion.a
                key={ch.label}
                href={ch.href}
                target={ch.isExternal ? "_blank" : undefined}
                rel={ch.isExternal ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}
                whileHover={{ x: 4 }}
                className="group flex items-center gap-4 p-4 rounded-xl cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition:
                    "background 0.25s, border-color 0.25s, box-shadow 0.25s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    `${ch.color}08`;
                  (e.currentTarget as HTMLElement).style.borderColor =
                    `${ch.color}28`;
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 0 24px ${ch.color}10`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.02)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: `${ch.color}12`,
                    border: `1px solid ${ch.color}28`,
                    color: ch.color,
                  }}
                >
                  {ch.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="text-[10px] font-mono tracking-[0.25em] uppercase mb-0.5"
                    style={{ color: "rgba(255,255,255,0.28)" }}
                  >
                    {ch.label}
                  </p>
                  <p
                    className="text-sm font-medium truncate"
                    style={{ color: "rgba(255,255,255,0.72)" }}
                  >
                    {ch.value}
                  </p>
                </div>

                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: ch.color }}
                >
                  <path
                    d="M3 13L13 3M13 3H6M13 3V10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>
            ))}

            {/* Status indicator */}
            <div
              className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(124,255,107,0.04)",
                border: "1px solid rgba(124,255,107,0.14)",
              }}
            >
              <span className="relative flex w-2.5 h-2.5 flex-shrink-0">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ background: "#7CFF6B" }}
                />
                <span
                  className="relative inline-flex rounded-full w-2.5 h-2.5"
                  style={{ background: "#7CFF6B" }}
                />
              </span>
              <span
                className="text-[11px] font-mono tracking-[0.22em]"
                style={{ color: "rgba(124,255,107,0.75)" }}
              >
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </div>
          </motion.div>

          {/* ── RIGHT — Form ────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.025)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(0,229,255,0.12)",
              boxShadow:
                "0 0 0 1px rgba(0,229,255,0.06) inset, 0 24px 64px rgba(0,0,0,0.4), 0 0 60px rgba(0,229,255,0.04)",
            }}
          >
            {/* Scanline overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-[1] rounded-2xl overflow-hidden"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.012) 2px, rgba(0,229,255,0.012) 4px)",
              }}
            />
            {/* Top edge gradient */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.4) 40%, rgba(124,255,107,0.3) 70%, transparent 100%)",
              }}
            />

            <div className="p-7 md:p-10">
              {/* Panel label */}
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "#00E5FF",
                    boxShadow: "0 0 8px rgba(0,229,255,0.8)",
                  }}
                />
                <span
                  className="text-[10px] font-mono tracking-[0.38em] uppercase"
                  style={{ color: "rgba(0,229,255,0.5)" }}
                >
                  TRANSMISSION TERMINAL
                </span>
              </div>

              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.form
                    key="form"
                    aria-label="Contact form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <GlassInput
                        label="Full Name"
                        id="name"
                        placeholder="Enter your name..."
                        value={name}
                        onChange={setName}
                      />
                      <GlassInput
                        label="Email Address"
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(v) => setEmail(v.replace(/\s/g, ""))}
                      />
                    </div>
                    <GlassInput
                      label="Inquiry / Message"
                      id="message"
                      placeholder="Tell me about your project, idea, opportunity, or collaboration..."
                      value={message}
                      onChange={(v) => { setMessage(v); setError(null); }}
                      multiline
                      rows={5}
                    />

                    {/* ── Error notification ─────────────────────────────── */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          key="error-msg"
                          role="alert"
                          aria-live="assertive"
                          initial={{ opacity: 0, y: -8, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -8, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="flex items-start gap-3 px-4 py-3 rounded-xl"
                          style={{
                            background: "rgba(255,80,80,0.07)",
                            border: "1px solid rgba(255,80,80,0.22)",
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="flex-shrink-0 mt-0.5"
                          >
                            <circle cx="8" cy="8" r="7" stroke="#ff5050" strokeWidth="1.4"/>
                            <path d="M8 5v4M8 11v.5" stroke="#ff5050" strokeWidth="1.6" strokeLinecap="round"/>
                          </svg>
                          <span
                            className="text-xs leading-relaxed"
                            style={{ color: "rgba(255,120,120,0.85)" }}
                          >
                            {error}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      aria-label={sending ? "Transmitting message..." : "Initialize connection and send message"}
                      disabled={
                        sending ||
                        !name.trim() ||
                        !email.trim() ||
                        !message.trim()
                      }
                      whileHover={!sending ? { y: -2, scale: 1.015 } : {}}
                      whileTap={!sending ? { scale: 0.98 } : {}}
                      className="relative mt-1 w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm tracking-wide overflow-hidden"
                      style={{
                        background: sending
                          ? "rgba(0,229,255,0.1)"
                          : "linear-gradient(135deg, #00E5FF 0%, #7CFF6B 100%)",
                        color: sending ? "rgba(0,229,255,0.6)" : "#060d12",
                        border: sending
                          ? "1px solid rgba(0,229,255,0.2)"
                          : "none",
                        cursor:
                          sending ||
                          !name.trim() ||
                          !email.trim() ||
                          !message.trim()
                            ? "not-allowed"
                            : "pointer",
                        opacity:
                          !name.trim() || !email.trim() || !message.trim()
                            ? 0.5
                            : 1,
                        boxShadow: sending
                          ? "none"
                          : "0 0 32px rgba(0,229,255,0.28), 0 0 60px rgba(124,255,107,0.12)",
                        transition: "box-shadow 0.3s ease, opacity 0.3s ease",
                      }}
                    >
                      {sending ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-4 h-4 rounded-full border-2 border-current border-t-transparent"
                          />
                          <span className="font-mono tracking-[0.2em] text-xs">
                            TRANSMITTING...
                          </span>
                        </>
                      ) : (
                        <>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Initialize Connection
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  /* ── Success state ────────────────────────────────────── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center gap-6 text-center py-12"
                  >
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                        style={{ background: "rgba(124,255,107,0.18)" }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          scale: [1, 1.28, 1.28],
                          opacity: [0.5, 0, 0],
                        }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          delay: 0.3,
                        }}
                        style={{ background: "rgba(124,255,107,0.15)" }}
                      />
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{
                          background: "rgba(124,255,107,0.1)",
                          border: "1px solid rgba(124,255,107,0.35)",
                          boxShadow: "0 0 30px rgba(124,255,107,0.2)",
                        }}
                      >
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <motion.path
                            d="M5 12L10 17L19 7"
                            stroke="#7CFF6B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <p
                        className="text-[11px] font-mono tracking-[0.45em] uppercase mb-2"
                        style={{ color: "rgba(124,255,107,0.6)" }}
                      >
                        CONNECTION ESTABLISHED
                      </p>
                      <p
                        className="text-2xl font-black"
                        style={{
                          background:
                            "linear-gradient(135deg, #ffffff, rgba(255,255,255,0.75))",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        Message Transmitted.
                      </p>
                      <p
                        className="mt-3 text-sm leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.38)" }}
                      >
                        I&apos;ll get back to you as soon as possible.
                      </p>
                    </div>

                    <motion.button
                      onClick={() => {
                        setSent(false);
                        setName("");
                        setEmail("");
                        setMessage("");
                      }}
                      whileHover={{ y: -1 }}
                      className="text-[11px] font-mono tracking-[0.28em] uppercase px-5 py-2.5 rounded-lg cursor-pointer"
                      style={{
                        color: "rgba(0,229,255,0.6)",
                        border: "1px solid rgba(0,229,255,0.18)",
                        background: "rgba(0,229,255,0.05)",
                      }}
                    >
                      SEND ANOTHER
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* ── Footer line ─────────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="text-center mt-20 text-xs font-mono tracking-[0.22em]"
          style={{ color: "rgba(255,255,255,0.12)" }}
        >
          {profile.contactFooter}
        </motion.p>
      </div>
    </section>
  );
}
