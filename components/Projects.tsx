"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { projects } from "@/lib/data/projects";
import type { Project } from "@/lib/data/projects";

// ── Project Visual (gradient fallback when no image) ──────────────────────────
function ProjectVisual({ project }: { project: Project }) {
  if (project.thumbnailImage) {
    return (
      <Image
        src={project.thumbnailImage}
        alt={project.title}
        fill
        quality={85}
        loading="lazy"
        className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ padding: "0" }}
      />
    );
  }

  // Accent-color gradient mesh fallback
  return (
    <>
      {/* Base gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 30% 40%, ${project.accentColor}18 0%, transparent 65%),
                       radial-gradient(ellipse 50% 50% at 75% 70%, ${project.accentColor}0c 0%, transparent 60%),
                       linear-gradient(145deg, rgba(255,255,255,0.02) 0%, transparent 60%)`,
        }}
      />
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(${project.accentColor}20 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      {/* Corner glow */}
      <div
        aria-hidden="true"
        className="absolute -top-6 -left-6 w-40 h-40 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
        style={{ background: project.accentColor }}
      />
      {/* Large ghost ID */}
      <span
        aria-hidden="true"
        className="absolute right-5 bottom-3 text-[6rem] font-black leading-none select-none pointer-events-none tracking-tighter opacity-[0.06] group-hover:opacity-[0.1] transition-opacity duration-500"
        style={{ color: project.accentColor }}
      >
        {project.id}
      </span>
      {/* Category label */}
      <span
        className="absolute top-4 left-4 text-[10px] font-mono tracking-[0.28em] uppercase px-2.5 py-1 rounded-md"
        style={{
          background: `${project.accentColor}14`,
          border: `1px solid ${project.accentColor}28`,
          color: `${project.accentColor}cc`,
        }}
      >
        {project.category.split(" · ")[0]}
      </span>
    </>
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: Project["status"] }) {
  const config = {
    completed: { label: "Completed", color: "#a8ff78" },
    "in-progress": { label: "In Progress", color: "#f59e0b" },
    research: { label: "Research", color: "#06b6d4" },
  }[status];

  return (
    <span
      role="status"
      aria-label={`Project status: ${config.label}`}
      className="absolute top-3 left-3 text-[9px] font-mono px-2 py-0.5 rounded"
      style={{
        background: `${config.color}14`,
        border: `1px solid ${config.color}28`,
        color: config.color,
      }}
    >
      {config.label}
    </span>
  );
}

// ── Project Card ───────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  isWide,
}: {
  project: Project;
  index: number;
  isWide: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative rounded-2xl overflow-hidden flex flex-col h-full"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${project.accentColor}30`;
        e.currentTarget.style.boxShadow = `0 0 48px ${project.accentColor}14, inset 0 0 40px ${project.accentColor}06`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* ── Image / Visual Zone ───────────────────────────────────────────── */}
      <div
        className={`relative w-full overflow-hidden flex-shrink-0 ${isWide ? "h-[260px] md:h-[320px]" : "h-[200px] md:h-[230px]"}`}
        style={{ background: "rgba(8,6,20,0.95)" }}
      >
        <ProjectVisual project={project} />
        {/* Bottom fade into card body */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(13,13,13,0.96) 0%, transparent 100%)",
          }}
        />
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accentColor}60, transparent)`,
          }}
        />
        {/* Year badge — top right */}
        <span
          className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded"
          style={{
            background: "rgba(13,13,13,0.7)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          {project.year}
        </span>
        {/* Status badge — top left (only if no thumbnailImage, otherwise overlaps) */}
        {project.thumbnailImage && <StatusBadge status={project.status} />}
      </div>

      {/* ── Content Zone ─────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-6 md:p-7">
        {/* Category */}
        <p
          className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3"
          style={{ color: project.accentColor }}
        >
          {project.category}
        </p>

        {/* Title */}
        <h3
          className="font-black text-white mb-3 leading-tight tracking-tight"
          style={{ fontSize: isWide ? "clamp(1.4rem, 2.5vw, 2rem)" : "clamp(1.15rem, 2vw, 1.55rem)" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-white/40 text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-4 mb-5">
          {project.tech.slice(0, isWide ? 6 : 4).map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium"
              style={{
                background: `${project.accentColor}0c`,
                border: `1px solid ${project.accentColor}18`,
                color: `${project.accentColor}aa`,
              }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > (isWide ? 6 : 4) && (
            <span
              className="px-2.5 py-1 rounded-md text-[11px] font-medium"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              +{project.tech.length - (isWide ? 6 : 4)} more
            </span>
          )}
        </div>

        {/* Footer: action buttons */}
        <div className="flex items-center gap-3 pt-5 border-t border-white/5">
          {/* View Project — primary CTA */}
          <Link href={`/projects/${project.slug}`} aria-label={`View details of project: ${project.title}`} className="flex-1">
            <motion.div
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold"
              style={{
                background: `${project.accentColor}12`,
                border: `1px solid ${project.accentColor}25`,
                color: project.accentColor,
              }}
              whileHover={{
                background: `${project.accentColor}1e`,
                scale: 1.01,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.18 }}
            >
              View Project
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 13L13 3M13 3H6M13 3V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </Link>

          {/* GitHub icon button — only if URL exists */}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source code on GitHub`}
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border border-white/8 text-white/30 bg-white/[0.02]"
              whileHover={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)", scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.18 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.104-.253-.448-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.026 2.747-1.026.548 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Section Header ─────────────────────────────────────────────────────────────
function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="mb-20 md:mb-28 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="flex items-center justify-center gap-4 mb-8"
      >
        <span className="h-px w-10 bg-[#a8ff78]/50" />
        <span className="text-[#a8ff78] text-[10px] uppercase tracking-[0.38em] font-mono">
          Featured Projects
        </span>
        <span className="h-px w-10 bg-[#a8ff78]/50" />
      </motion.div>

      <motion.h2
        id="projects-heading"
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.1 }}
        className="font-black text-white leading-[1.05] tracking-tight"
        style={{ fontSize: "clamp(2.5rem, 6vw, 4.8rem)" }}
      >
        Things I&apos;ve
        <br />
        <span
          className="text-transparent bg-clip-text"
          style={{ backgroundImage: "linear-gradient(90deg, #a8ff78, #78ffd6)" }}
        >
          built.
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.2 }}
        className="mt-8 text-white/35 max-w-xl text-sm md:text-base leading-relaxed mx-auto"
      >
        Full-stack web apps, AI-powered platforms, and machine learning research
        — each project solving a real-world problem.
      </motion.p>
    </div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="page-container relative py-24 md:py-32 border-t border-white/5"
    >
      <SectionHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={i === 0 ? "md:col-span-2" : ""}
          >
            <ProjectCard
              project={project}
              index={i}
              isWide={i === 0}
            />
          </div>
        ))}
      </div>

      {/* View all CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 flex justify-center"
      >
        <Link
          href="/projects/allora-ai"
          aria-label="Explore all projects and case studies"
          className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-medium text-white overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          <span>Explore all projects</span>
          <motion.span
            className="inline-block"
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            →
          </motion.span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/[0.04]" />
        </Link>
      </motion.div>
    </section>
  );
}
