"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Project } from "@/lib/data/projects";
import ProjectNavbar from "@/components/ProjectNavbar";
import Footer from "@/components/Footer";

// ─── Spacing tokens (premium whitespace system) ───────────────────────────────
// Section vertical padding: py-32 md:py-40  (128px–160px)
// Section gap from border:  border-t border-white/5
// Card inner padding:        p-8 md:p-10     (32px–40px)
// Grid gap:                  gap-6 md:gap-8  (24px–32px)
// Heading → body gap:        mb-6 md:mb-8
// Label → heading gap:       mb-5
// Paragraph max-width:       max-w-3xl (readable line length)
// List item spacing:         space-y-4

// ─── Shared animation helpers ─────────────────────────────────────────────────
const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE },
  }),
};

function SectionReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Section label — consistent across all sections
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <span className="h-px w-8 bg-[#a8ff78]/50" />
      <span className="text-[#a8ff78] text-[10px] uppercase tracking-[0.38em] font-mono">
        {children}
      </span>
      <span className="h-px flex-1 bg-white/5" />
    </div>
  );
}

// ─── Section 1: Hero ──────────────────────────────────────────────────────────
// Fix: navbar height = 80px scrolled-up / 62px scrolled.
// We use a dedicated image zone at top (full-width, fixed height),
// then content below it — never overlapping. No more `absolute` text on image.
function HeroSection({ project }: { project: Project }) {
  const statusConfig = {
    completed: { label: "Completed", color: "#a8ff78", bg: "rgba(168,255,120,0.08)", border: "rgba(168,255,120,0.2)" },
    "in-progress": { label: "In Progress", color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" },
    research: { label: "Research", color: "#06b6d4", bg: "rgba(6,182,212,0.08)", border: "rgba(6,182,212,0.2)" },
  }[project.status];

  return (
    <section className="relative w-full">
      {/* ── Thumbnail Zone — sits below navbar (pt-20 = 80px offset) ───────── */}
      <div className="relative w-full" style={{ paddingTop: "80px" }}>
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: "clamp(340px, 52vw, 680px)",
            background: "rgba(6,6,18,0.98)",
          }}
        >
          {project.thumbnailImage ? (
            <Image
              src={project.thumbnailImage}
              alt={project.title}
              fill
              quality={90}
              priority
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-contain"
              style={{ padding: "24px 48px 48px" }}
            />
          ) : (
            <>
              {/* Gradient fallback */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse 80% 70% at 30% 40%, ${project.accentColor}22 0%, transparent 65%),
                               radial-gradient(ellipse 50% 60% at 75% 70%, ${project.accentColor}10 0%, transparent 60%)`,
                }}
              />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(${project.accentColor}25 1px, transparent 1px)`,
                  backgroundSize: "32px 32px",
                }}
              />
            </>
          )}

          {/* Bottom gradient fade into the content zone */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "200px",
              background: "linear-gradient(to top, #0d0d0d 0%, rgba(13,13,13,0.7) 50%, transparent 100%)",
            }}
          />

          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent, ${project.accentColor}50, transparent)`,
            }}
          />
        </div>
      </div>

      {/* ── Hero Content — below the image, with generous padding ──────────── */}
      <div className="relative" style={{ background: "#0d0d0d" }}>
        {/* Subtle radial glow from accent color */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(ellipse at center top, ${project.accentColor}30 0%, transparent 70%)`,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="relative page-container pt-14 pb-20 md:pt-16 md:pb-24"
        >
          {/* Category + Status + Year row */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.3em] px-3.5 py-1.5 rounded-full"
              style={{
                background: `${project.accentColor}14`,
                border: `1px solid ${project.accentColor}28`,
                color: project.accentColor,
              }}
            >
              {project.category}
            </span>
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.22em] px-3.5 py-1.5 rounded-full"
              style={{
                background: statusConfig.bg,
                border: `1px solid ${statusConfig.border}`,
                color: statusConfig.color,
              }}
            >
              {statusConfig.label}
            </span>
            <span className="text-white/25 text-xs font-mono tracking-widest">{project.year}</span>
          </div>

          {/* Project title */}
          <h1
            className="font-black text-white leading-[1.0] tracking-tight mb-8"
            style={{ fontSize: "clamp(3.2rem, 8vw, 7rem)" }}
          >
            {project.title}
          </h1>

          {/* Meta row — role & duration */}
          <div className="flex flex-wrap items-center gap-8 mb-8 text-sm text-white/40">
            <span className="flex items-center gap-2.5">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M8 5v2.5L9.5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              {project.duration}
            </span>
            <span className="flex items-center gap-2.5">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 2a3 3 0 100 6 3 3 0 000-6zM3 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              {project.role}
            </span>
          </div>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-2.5 mb-12">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3.5 py-1.5 rounded-lg text-[12px] font-medium"
                style={{
                  background: `${project.accentColor}0e`,
                  border: `1px solid ${project.accentColor}22`,
                  color: `${project.accentColor}cc`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.85)",
                }}
                whileHover={{ background: "rgba(255,255,255,0.1)", scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.104-.253-.448-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.026 2.747-1.026.548 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                {project.githubBackendUrl ? "Frontend" : "View on GitHub"}
              </motion.a>
            )}
            {project.githubBackendUrl && (
              <motion.a
                href={project.githubBackendUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.85)",
                }}
                whileHover={{ background: "rgba(255,255,255,0.1)", scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.104-.253-.448-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.026 2.747-1.026.548 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                Backend
              </motion.a>
            )}
            {project.liveDemoUrl && (
              <motion.a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold"
                style={{
                  background: `${project.accentColor}18`,
                  border: `1px solid ${project.accentColor}35`,
                  color: project.accentColor,
                }}
                whileHover={{ background: `${project.accentColor}28`, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Live Demo
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 2: Overview ──────────────────────────────────────────────────────
function OverviewSection({ project }: { project: Project }) {
  if (!project.overview) return null;
  const cards = [
    { label: "Problem", content: project.overview.problem, icon: "⚡", color: "#f43f5e" },
    { label: "Solution", content: project.overview.solution, icon: "🔬", color: project.accentColor },
    { label: "Impact", content: project.overview.impact, icon: "🚀", color: "#a8ff78" },
  ];

  return (
    <section className="page-container py-32 md:py-40 border-t border-white/5">
      <SectionReveal>
        <SectionLabel>Project Overview</SectionLabel>
        <h2
          className="font-black text-white leading-tight tracking-tight mb-5"
          style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
        >
          What this project{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: `linear-gradient(90deg, ${project.accentColor}, #78ffd6)` }}
          >
            solves.
          </span>
        </h2>
        <p className="text-white/40 text-base leading-[1.85] max-w-2xl mb-16 md:mb-20">
          {project.description}
        </p>
      </SectionReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {cards.map((card, i) => (
          <SectionReveal key={card.label} delay={i * 0.1}>
            <div
              className="relative rounded-3xl p-8 md:p-10 h-full flex flex-col gap-6 overflow-hidden group"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
                transition: "border-color 0.35s ease, box-shadow 0.35s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${card.color}25`;
                e.currentTarget.style.boxShadow = `0 0 40px ${card.color}0c`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${card.color}60, transparent)` }}
              />
              <div className="flex items-center gap-3.5">
                <span className="text-2xl">{card.icon}</span>
                <span
                  className="text-xs font-bold uppercase tracking-[0.25em]"
                  style={{ color: card.color }}
                >
                  {card.label}
                </span>
              </div>
              <p className="text-white/55 text-sm leading-[1.9] flex-1">{card.content}</p>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}

// ─── Section 3: Image Gallery + Lightbox ─────────────────────────────────────
function GallerySection({ project }: { project: Project }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!project.galleryImages || project.galleryImages.length === 0) return null;
  const images = project.galleryImages;

  return (
    <section className="page-container py-32 md:py-40 border-t border-white/5">
      <SectionReveal>
        <SectionLabel>Gallery</SectionLabel>
        <h2
          className="font-black text-white tracking-tight mb-14 md:mb-16"
          style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}
        >
          Screenshots &amp; Previews
        </h2>
      </SectionReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {images.map((src, i) => (
          <SectionReveal key={src} delay={i * 0.07}>
            <motion.button
              onClick={() => setLightboxIndex(i)}
              className="group relative w-full aspect-video rounded-2xl overflow-hidden focus:outline-none"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.25 }}
            >
              <Image
                src={src}
                alt={`${project.title} screenshot ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.45)" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-9 9M3 21l9-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.button>
          </SectionReveal>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(20px)" }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="relative max-w-5xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex]}
                alt={`${project.title} screenshot ${lightboxIndex + 1}`}
                width={1400}
                height={900}
                className="w-full h-auto object-contain"
              />
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
                style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              {lightboxIndex > 0 && (
                <button
                  onClick={() => setLightboxIndex((i) => (i ?? 0) - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
                  style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
              {lightboxIndex < images.length - 1 && (
                <button
                  onClick={() => setLightboxIndex((i) => (i ?? 0) + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
                  style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-mono text-white/50"
                style={{ background: "rgba(0,0,0,0.6)" }}
              >
                {lightboxIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Section 4: Demo Video ────────────────────────────────────────────────────
function VideoSection({ project }: { project: Project }) {
  if (!project.videoUrl) return null;

  const isYouTube =
    project.videoUrl.includes("youtube.com") ||
    project.videoUrl.includes("youtu.be");

  const getYouTubeEmbed = (url: string) => {
    const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <section className="page-container py-32 md:py-40 border-t border-white/5">
      <SectionReveal>
        <SectionLabel>Demo Video</SectionLabel>
        <h2
          className="font-black text-white tracking-tight mb-12 md:mb-14"
          style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}
        >
          See it in action
        </h2>
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <div
          className="relative w-full aspect-video rounded-3xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {isYouTube ? (
            <iframe
              src={getYouTubeEmbed(project.videoUrl)}
              title={`${project.title} demo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              src={project.videoUrl}
              controls
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>
      </SectionReveal>
    </section>
  );
}

// ─── Section 5: Documentation ─────────────────────────────────────────────────
function DocumentationSection({ project }: { project: Project }) {
  if (!project.documentationPdf) return null;

  return (
    <section className="page-container py-32 md:py-40 border-t border-white/5">
      <SectionReveal>
        <SectionLabel>Documentation</SectionLabel>
        <h2
          className="font-black text-white tracking-tight mb-12 md:mb-14"
          style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}
        >
          Project Documentation
        </h2>
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-7 p-8 md:p-10 rounded-3xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* PDF icon */}
          <div
            className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: `${project.accentColor}10`,
              border: `1px solid ${project.accentColor}20`,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: project.accentColor }}>
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M14 2v6h6M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-base mb-1.5">{project.title} — Documentation</p>
            <p className="text-white/40 text-sm leading-relaxed">Project report, technical specifications, and research findings.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href={project.documentationPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium"
              style={{
                background: `${project.accentColor}14`,
                border: `1px solid ${project.accentColor}25`,
                color: project.accentColor,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 10v4h12v-4M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              View PDF
            </a>
            <a
              href={project.documentationPdf}
              download
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Download
            </a>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

// ─── Section 6: Technical Details ─────────────────────────────────────────────
function TechnicalDetailsSection({ project }: { project: Project }) {
  const hasAny =
    (project.features?.length ?? 0) > 0 ||
    (project.challenges?.length ?? 0) > 0 ||
    (project.solutions?.length ?? 0) > 0 ||
    (project.lessonsLearned?.length ?? 0) > 0;

  if (!hasAny) return null;

  const columns = [
    {
      label: "Features",
      items: project.features ?? [],
      color: project.accentColor,
      icon: "✦",
    },
    {
      label: "Challenges",
      items: project.challenges ?? [],
      color: "#f43f5e",
      icon: "◈",
    },
    {
      label: "Solutions",
      items: project.solutions ?? [],
      color: "#a8ff78",
      icon: "◉",
    },
    {
      label: "Lessons Learned",
      items: project.lessonsLearned ?? [],
      color: "#06b6d4",
      icon: "◆",
    },
  ].filter((c) => c.items.length > 0);

  return (
    <section className="page-container py-32 md:py-40 border-t border-white/5">
      <SectionReveal>
        <SectionLabel>Technical Details</SectionLabel>
        <h2
          className="font-black text-white tracking-tight mb-14 md:mb-16"
          style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}
        >
          Under the hood
        </h2>
      </SectionReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {columns.map((col, i) => (
          <SectionReveal key={col.label} delay={i * 0.08}>
            <div
              className="group relative rounded-3xl p-8 md:p-10 h-full overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                transition: "border-color 0.35s ease, box-shadow 0.35s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${col.color}22`;
                e.currentTarget.style.boxShadow = `0 0 40px ${col.color}0a`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${col.color}55, transparent)` }}
              />
              <div className="flex items-center gap-3 mb-7">
                <span style={{ color: col.color }} className="text-sm font-mono">{col.icon}</span>
                <h3
                  className="text-sm font-bold uppercase tracking-[0.2em]"
                  style={{ color: col.color }}
                >
                  {col.label}
                </h3>
              </div>
              <ul className="space-y-4">
                {col.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-4 text-sm text-white/55 leading-[1.8]">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0"
                      style={{ background: col.color, boxShadow: `0 0 6px ${col.color}` }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}

// ─── Section 7: Technology Stack ──────────────────────────────────────────────
function TechStackSection({ project }: { project: Project }) {
  const techColors: Record<string, string> = {
    React: "#61dafb",
    "Next.js": "#ffffff",
    "Node.js": "#84cc16",
    "Express.js": "#ffffff",
    PostgreSQL: "#4ade80",
    MongoDB: "#4ade80",
    MySQL: "#f59e0b",
    Python: "#fbbf24",
    XGBoost: "#06b6d4",
    SHAP: "#a78bfa",
    "Scikit-Learn": "#f97316",
    Ruptures: "#06b6d4",
    Pandas: "#8b5cf6",
    NumPy: "#60a5fa",
    Matplotlib: "#f43f5e",
    PHP: "#818cf8",
    JSP: "#f59e0b",
    Servlet: "#f59e0b",
    JDBC: "#f59e0b",
    Bootstrap: "#7c3aed",
    TypeScript: "#3b82f6",
    JavaScript: "#fbbf24",
    Svelte: "#f43f5e",
    "REST API": "#10b981",
    "Framer Motion": "#ec4899",
  };

  return (
    <section className="page-container py-32 md:py-40 border-t border-white/5">
      <SectionReveal>
        <SectionLabel>Technology Stack</SectionLabel>
        <h2
          className="font-black text-white tracking-tight mb-14 md:mb-16"
          style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}
        >
          Built with
        </h2>
      </SectionReveal>

      <div className="flex flex-wrap gap-4 md:gap-5">
        {project.tech.map((tech, i) => {
          const color = techColors[tech] ?? project.accentColor;
          return (
            <SectionReveal key={tech} delay={i * 0.06}>
              <motion.div
                className="group relative px-6 py-4 rounded-2xl overflow-hidden cursor-default"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                whileHover={{
                  borderColor: `${color}35`,
                  boxShadow: `0 0 32px ${color}12, inset 0 0 24px ${color}06`,
                  y: -4,
                }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className="absolute -top-4 -right-4 w-12 h-12 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-400"
                  style={{ background: color }}
                />
                <div className="relative flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    {tech}
                  </span>
                </div>
              </motion.div>
            </SectionReveal>
          );
        })}
      </div>
    </section>
  );
}

// ─── Section 8: Related Projects ──────────────────────────────────────────────
function RelatedProjectsSection({ related }: { related: Project[] }) {
  if (related.length === 0) return null;

  return (
    <section className="page-container py-32 md:py-40 border-t border-white/5">
      <SectionReveal>
        <SectionLabel>More Projects</SectionLabel>
        <h2
          className="font-black text-white tracking-tight mb-14 md:mb-16"
          style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}
        >
          Keep exploring
        </h2>
      </SectionReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {related.map((p, i) => (
          <SectionReveal key={p.slug} delay={i * 0.1}>
            <Link href={`/projects/${p.slug}`} className="block group h-full">
              <motion.div
                className="relative rounded-3xl overflow-hidden h-full flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                whileHover={{
                  borderColor: `${p.accentColor}30`,
                  boxShadow: `0 0 48px ${p.accentColor}12`,
                  y: -6,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Thumbnail zone — taller for better visual weight */}
                <div
                  className="relative overflow-hidden flex-shrink-0"
                  style={{ height: "200px", background: "rgba(0,0,0,0.3)" }}
                >
                  {p.thumbnailImage ? (
                    <Image
                      src={p.thumbnailImage}
                      alt={p.title}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ padding: "12px 20px 24px" }}
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(ellipse 80% 60% at 30% 40%, ${p.accentColor}18 0%, transparent 65%)`,
                      }}
                    />
                  )}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-14"
                    style={{ background: "linear-gradient(to top, rgba(13,13,13,0.95), transparent)" }}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${p.accentColor}55, transparent)` }}
                  />
                </div>

                {/* Content zone */}
                <div className="flex flex-col flex-1 p-7 md:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3" style={{ color: p.accentColor }}>
                    {p.category}
                  </p>
                  <h3 className="text-white font-bold text-base leading-snug mb-4 group-hover:text-white/90 transition-colors flex-1">
                    {p.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-white/30">
                      <span>{p.year}</span>
                      <span>·</span>
                      <span>{p.role}</span>
                    </div>
                    <span
                      className="text-[11px] font-medium flex items-center gap-1.5 transition-all duration-200 group-hover:gap-2.5"
                      style={{ color: p.accentColor }}
                    >
                      View
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                        <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}

// ─── Main Client Component ────────────────────────────────────────────────────
export default function ProjectDetailClient({
  project,
  related,
}: {
  project: Project;
  related: Project[];
}) {
  return (
    <div className="relative bg-[#0d0d0d] min-h-screen">
      <ProjectNavbar />

      <main>
        <HeroSection project={project} />
        <OverviewSection project={project} />
        <GallerySection project={project} />
        <VideoSection project={project} />
        <DocumentationSection project={project} />
        <TechnicalDetailsSection project={project} />
        <TechStackSection project={project} />
        <RelatedProjectsSection related={related} />
      </main>

      <Footer />
    </div>
  );
}
