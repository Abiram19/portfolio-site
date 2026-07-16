"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Certification } from "@/lib/data/certifications";
import { certifications } from "@/lib/data/certifications";
import ProjectNavbar from "@/components/ProjectNavbar";
import Footer from "@/components/Footer";

// ─── Shared animation helper ──────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Section card wrapper ─────────────────────────────────────────────────────
function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`p-6 md:p-8 rounded-2xl ${className}`}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {children}
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({
  children,
  color,
  className = "",
}: {
  children: React.ReactNode;
  color: string;
  className?: string;
}) {
  return (
    <h3
      className={`text-[10px] font-bold uppercase tracking-[0.25em] ${className}`}
      style={{ color }}
    >
      {children}
    </h3>
  );
}

// ─── Main Client Component ────────────────────────────────────────────────────
export default function CertificationDetailClient({
  cert,
}: {
  cert: Certification;
}) {
  // Compute prev / next for navigation
  const currentIndex = certifications.findIndex((c) => c.slug === cert.slug);
  const prevCert = currentIndex > 0 ? certifications[currentIndex - 1] : null;
  const nextCert =
    currentIndex < certifications.length - 1
      ? certifications[currentIndex + 1]
      : null;

  // Credential info rows
  const credentialRows = [
    { label: "Issuer", value: cert.issuer },
    { label: "Category", value: cert.category },
    ...(cert.issuedDate ? [{ label: "Issued", value: cert.issuedDate }] : []),
    ...(cert.expiryDate
      ? [{ label: "Expires", value: cert.expiryDate }]
      : [{ label: "Expires", value: "No expiry" }]),
    ...(cert.credentialId
      ? [{ label: "Credential ID", value: cert.credentialId }]
      : []),
  ];

  return (
    <div className="relative bg-[#0d0d0d] min-h-screen overflow-x-hidden">
      <ProjectNavbar />

      {/*
        ── Offset the fixed navbar safely ───────────────────────────────────────
        The navbar starts at 80px tall (unscrolled) and shrinks to 62px.
        We use padding-top = navbar height + generous breathing room so the
        hero content NEVER hides behind the bar on any breakpoint.
        We use a CSS var (--navbar-h: 80px set in globals.css) plus extra space.
      */}
      <main
        className="page-container pb-24"
        style={{ paddingTop: "calc(var(--navbar-h) + 3.5rem)" }}
      >
        {/* ── Hero Header ──────────────────────────────────────────────────── */}
        <FadeUp className="mb-10 md:mb-14">
          {/* Category badge + date */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="inline-flex text-[10px] font-bold uppercase tracking-[0.28em] px-3 py-1.5 rounded-full whitespace-nowrap"
              style={{
                background: `${cert.color}14`,
                border: `1px solid ${cert.color}28`,
                color: cert.color,
              }}
            >
              {cert.category}
            </span>
            {cert.issuedDate && (
              <span className="text-white/30 text-[11px] font-mono">
                {cert.issuedDate}
              </span>
            )}
            {cert.credentialId && (
              <span
                className="text-[10px] font-mono px-2.5 py-1 rounded-md"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                ID: {cert.credentialId}
              </span>
            )}
          </div>

          {/* Title — with word-break to prevent overflow on narrow screens */}
          <h1
            className="font-black text-white leading-[1.1] tracking-tight mb-5 break-words hyphens-auto max-w-4xl"
            style={{ fontSize: "clamp(1.75rem, 5vw, 4rem)" }}
          >
            {cert.title}
          </h1>

          {/* Issuer */}
          <div className="flex items-center gap-2.5">
            <span className="text-xl flex-shrink-0">{cert.icon}</span>
            {cert.issuerUrl ? (
              <a
                href={cert.issuerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white/90 transition-colors text-sm md:text-base font-medium"
              >
                {cert.issuer}&nbsp;↗
              </a>
            ) : (
              <span className="text-white/50 text-sm md:text-base font-medium">
                {cert.issuer}
              </span>
            )}
          </div>
        </FadeUp>

        {/* ── Certificate Preview + Info Panel ─────────────────────────────── */}
        {/*
          Layout strategy:
          - Mobile (< lg): full-width stack — image on top, panels below
          - Desktop (≥ lg): 3-col grid — image takes 2 cols, info takes 1 col
          - Info panel is sticky on desktop so it tracks while scrolling the image
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

          {/* ── Left: Certificate preview ─────────────────────────────────── */}
          <FadeUp delay={0.1} className="lg:col-span-2 min-w-0">
            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${cert.color}20`,
                // Fixed aspect for images; auto for PDF (needs real height)
                aspectRatio: cert.certificatePdf ? undefined : "4 / 3",
              }}
            >
              {cert.certificateImage ? (
                /* ── JPEG / PNG ── */
                <Image
                  src={cert.certificateImage}
                  alt={`${cert.title} certificate`}
                  fill
                  quality={90}
                  className="object-contain p-3 md:p-5"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              ) : cert.certificatePdf ? (
                /* ── PDF via iframe ── */
                <div className="relative w-full" style={{ height: "clamp(360px, 55vw, 640px)" }}>
                  <iframe
                    src={`${cert.certificatePdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    title={`${cert.title} certificate`}
                    className="absolute inset-0 w-full h-full rounded-2xl"
                    style={{ border: "none" }}
                  />
                  {/* Download fallback — visible below iframe for accessibility */}
                  <div className="absolute bottom-0 inset-x-0 flex justify-center pb-4 pointer-events-none">
                    <a
                      href={cert.certificatePdf}
                      download
                      className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 opacity-0 hover:opacity-100 focus:opacity-100"
                      style={{
                        background: `${cert.color}20`,
                        border: `1px solid ${cert.color}35`,
                        color: cert.color,
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3v7M5 7l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Download Certificate
                    </a>
                  </div>
                </div>
              ) : (
                /* ── Placeholder ── */
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                  <div
                    className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-4xl md:text-5xl flex-shrink-0"
                    style={{
                      background: `${cert.color}10`,
                      border: `1px solid ${cert.color}20`,
                    }}
                  >
                    {cert.icon}
                  </div>
                  <p className="text-white/20 text-xs md:text-sm font-mono text-center">
                    Certificate image coming soon.
                    <br />
                    <span style={{ color: cert.color }}>
                      public/certifications/{cert.slug}/certificate.jpg
                    </span>
                  </p>
                </div>
              )}

              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent, ${cert.color}55, transparent)`,
                }}
              />
            </div>

            {/* PDF download button — below iframe for clear CTA */}
            {cert.certificatePdf && (
              <a
                href={cert.certificatePdf}
                download
                className="mt-3 flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-semibold transition-all duration-200"
                style={{
                  background: `${cert.color}0c`,
                  border: `1px solid ${cert.color}20`,
                  color: `${cert.color}99`,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v7M5 7l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download Certificate PDF
              </a>
            )}
          </FadeUp>

          {/* ── Right: Information panels ─────────────────────────────────── */}
          <FadeUp delay={0.2} className="lg:sticky lg:top-[calc(var(--navbar-h)+1.5rem)] space-y-4 min-w-0">

            {/* Overview */}
            {cert.description && (
              <SectionCard>
                <SectionHeading color={cert.color} className="mb-3">
                  Overview
                </SectionHeading>
                <p className="text-white/50 text-sm leading-relaxed">
                  {cert.description}
                </p>
              </SectionCard>
            )}

            {/* Credential info */}
            <SectionCard>
              <SectionHeading color={cert.color} className="mb-4">
                Credential Info
              </SectionHeading>
              <dl className="space-y-3">
                {credentialRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-start justify-between gap-3 text-sm"
                  >
                    <dt className="text-white/30 flex-shrink-0 min-w-0 leading-snug">
                      {row.label}
                    </dt>
                    <dd
                      className="text-white/70 text-right font-medium break-all leading-snug"
                      style={{ maxWidth: "65%" }}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </SectionCard>

            {/* Skills */}
            {cert.skills && cert.skills.length > 0 && (
              <SectionCard>
                <SectionHeading color={cert.color} className="mb-4">
                  Skills Acquired
                </SectionHeading>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium leading-tight"
                      style={{
                        background: `${cert.color}0e`,
                        border: `1px solid ${cert.color}20`,
                        color: `${cert.color}bb`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </SectionCard>
            )}

            {/* Verify credential CTA */}
            {cert.verificationUrl && (
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:brightness-110"
                style={{
                  background: `${cert.color}14`,
                  border: `1px solid ${cert.color}28`,
                  color: cert.color,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13.5 4.5L6 12 2.5 8.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Verify Credential
              </a>
            )}
          </FadeUp>
        </div>

        {/* ── Full-width sections ───────────────────────────────────────────── */}
        {(cert.learningOutcomes?.length || cert.topics?.length) && (
          <div className="mt-8 space-y-6">

            {/* Learning Outcomes */}
            {cert.learningOutcomes && cert.learningOutcomes.length > 0 && (
              <FadeUp delay={0.3}>
                <SectionCard>
                  <SectionHeading color={cert.color} className="mb-6">
                    Learning Outcomes
                  </SectionHeading>
                  <ul
                    className="grid gap-3"
                    style={{
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
                    }}
                  >
                    {cert.learningOutcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-3">
                        {/* Checkmark icon */}
                        <span
                          className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: `${cert.color}18` }}
                          aria-hidden="true"
                        >
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M3 8L6.5 11.5L13 4.5"
                              stroke={cert.color}
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="text-white/55 text-sm leading-relaxed">
                          {outcome}
                        </span>
                      </li>
                    ))}
                  </ul>
                </SectionCard>
              </FadeUp>
            )}

            {/* Technologies & Topics Covered */}
            {cert.topics && cert.topics.length > 0 && (
              <FadeUp delay={0.4}>
                <SectionCard>
                  <SectionHeading color={cert.color} className="mb-6">
                    Technologies &amp; Topics Covered
                  </SectionHeading>
                  <div
                    className="grid gap-2.5"
                    style={{
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(min(100%, 160px), 1fr))",
                    }}
                  >
                    {cert.topics.map((topic) => (
                      <div
                        key={topic}
                        className="px-3 py-2.5 rounded-xl text-[12px] font-medium text-center leading-snug"
                        style={{
                          background: `${cert.color}08`,
                          border: `1px solid ${cert.color}18`,
                          color: `${cert.color}99`,
                        }}
                      >
                        {topic}
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </FadeUp>
            )}
          </div>
        )}

        {/* ── Navigation footer ────────────────────────────────────────────── */}
        <FadeUp delay={0.5}>
          <div className="mt-14 pt-10 border-t border-white/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 flex-wrap">

              {/* Back to all certifications */}
              <Link href="/#certifications" className="flex-shrink-0">
                <motion.span
                  className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors py-1"
                  whileHover={{ x: -3 }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M10 3L5 8L10 13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Back to all certifications
                </motion.span>
              </Link>

              {/* Prev / Next */}
              <div className="flex items-center gap-3">
                {prevCert && (
                  <Link href={`/certifications/${prevCert.slug}`}>
                    <motion.span
                      className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-colors"
                      style={{
                        background: `${prevCert.color}0c`,
                        border: `1px solid ${prevCert.color}20`,
                        color: `${prevCert.color}99`,
                      }}
                      whileHover={{ x: -2 }}
                    >
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                          d="M10 3L5 8L10 13"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="hidden sm:inline">Previous</span>
                    </motion.span>
                  </Link>
                )}
                {nextCert && (
                  <Link href={`/certifications/${nextCert.slug}`}>
                    <motion.span
                      className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-colors"
                      style={{
                        background: `${nextCert.color}0c`,
                        border: `1px solid ${nextCert.color}20`,
                        color: `${nextCert.color}99`,
                      }}
                      whileHover={{ x: 2 }}
                    >
                      <span className="hidden sm:inline">Next</span>
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                          d="M6 3L11 8L6 13"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </FadeUp>
      </main>

      <Footer />
    </div>
  );
}
