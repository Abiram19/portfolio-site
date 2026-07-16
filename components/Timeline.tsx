"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { milestones } from "@/lib/data/timeline";
import type { Milestone } from "@/lib/data/timeline";

// ── Institution Logo Badge ─────────────────────────────────────────────────────
function LogoBadge({ src, alt, color }: { src: string; alt: string; color: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex items-center justify-center p-1.5 relative"
      style={{
        background: "rgba(255,255,255,0.97)",
        border: `2px solid ${color}30`,
        boxShadow: `0 0 18px ${color}25, 0 0 0 3px ${color}08`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={56}
        height={56}
        quality={85}
        sizes="56px"
        loading="lazy"
        className="w-full h-full object-contain"
        onError={(e) => {
          (e.currentTarget as HTMLElement).style.display = "none";
        }}
      />
    </div>
  );
}

// ── Milestone Card ─────────────────────────────────────────────────────────────
function MilestoneCard({ milestone, isFuture }: { milestone: Milestone; isFuture: boolean }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={
        isFuture
          ? {
              background: "rgba(120,255,214,0.03)",
              border: `1px solid ${milestone.color}35`,
              boxShadow: `0 0 40px ${milestone.color}12, inset 0 0 30px ${milestone.color}05`,
            }
          : {
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
            }
      }
    >
      {/* Top edge accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, ${milestone.color}60, transparent)`,
        }}
      />
      {/* Left border stripe */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
        style={{
          background: `linear-gradient(to bottom, ${milestone.color}80, ${milestone.color}20)`,
        }}
      />

      <div className="pl-6 pr-6 pt-6 pb-7 md:pl-8 md:pr-8 md:pt-7 md:pb-8">
        {/* Type badge */}
        <span
          className="inline-block text-[9px] font-bold uppercase tracking-[0.22em] px-2.5 py-1 rounded-full mb-5"
          style={{
            background: `${milestone.color}12`,
            border: `1px solid ${milestone.color}28`,
            color: milestone.color,
          }}
        >
          {milestone.type}
        </span>

        {/* Logo + title row */}
        <div className="flex items-start gap-4 mb-5">
          {milestone.logo && (
            <LogoBadge
              src={milestone.logo}
              alt={milestone.institution ?? milestone.title}
              color={milestone.color}
            />
          )}
          <div className="flex-1 min-w-0">
            {milestone.institutionUrl ? (
              <a
                href={milestone.institutionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center gap-1.5"
              >
                <h3
                  className="text-white font-bold text-base md:text-lg leading-snug group-hover/link:opacity-80 transition-opacity"
                  style={{ ...(isFuture ? { color: milestone.color } : {}) }}
                >
                  {milestone.institution ?? milestone.title}
                </h3>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="opacity-0 group-hover/link:opacity-60 transition-opacity flex-shrink-0 mt-0.5"
                  style={{ color: milestone.color }}
                >
                  <path
                    d="M3 13L13 3M13 3H6M13 3V10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ) : (
              <h3
                className="text-white font-bold text-base md:text-lg leading-snug"
                style={{ ...(isFuture ? { color: milestone.color } : {}) }}
              >
                {milestone.institution ?? milestone.title}
              </h3>
            )}
            {milestone.institution && (
              <p className="text-white/30 text-sm mt-0.5">{milestone.title}</p>
            )}
            {milestone.period && (
              <p
                className="text-xs font-mono mt-1.5"
                style={{ color: `${milestone.color}80` }}
              >
                {milestone.period}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-white/40 text-sm leading-relaxed mb-5">
          {milestone.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5">
          {milestone.highlights.map((h) => (
            <span
              key={h}
              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium"
              style={{
                background: `${milestone.color}08`,
                border: `1px solid ${milestone.color}18`,
                color: `${milestone.color}aa`,
              }}
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Glowing Timeline Dot ───────────────────────────────────────────────────────
function TimelineDot({ color }: { color: string }) {
  return (
    <div aria-hidden="true" className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
      {/* Outer pulse ring */}
      <motion.div
        className="absolute rounded-full"
        style={{ background: `${color}20` }}
        animate={{ scale: [1, 1.85, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        initial={{ width: 20, height: 20 }}
      />
      {/* Inner dot */}
      <div
        className="w-3 h-3 rounded-full border-2 border-[#0d0d0d] relative z-10"
        style={{
          background: color,
          boxShadow: `0 0 10px ${color}80, 0 0 22px ${color}40`,
        }}
      />
    </div>
  );
}

// ── Chapter Progress Bar ───────────────────────────────────────────────────────
function ChapterProgress({ isInView }: { isInView: boolean }) {
  const chapters = milestones.map((m) => ({
    label: (m.institution ?? m.title).split(" ")[0],
    color: m.color,
    number: m.number,
  }));

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, y: -10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.3 }}
      className="flex items-center justify-center gap-0 mb-20 md:mb-28 max-w-2xl mx-auto overflow-hidden"
    >
      {chapters.map((ch, i) => (
        <div key={ch.number} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black"
              style={{
                background: `${ch.color}20`,
                border: `1px solid ${ch.color}40`,
                color: ch.color,
              }}
            >
              {i + 1}
            </div>
            <span
              className="hidden sm:block text-[9px] font-mono tracking-wider uppercase"
              style={{ color: `${ch.color}55` }}
            >
              {ch.label}
            </span>
          </div>
          {i < chapters.length - 1 && (
            <motion.div
              className="h-px mx-3 sm:mx-4"
              style={{
                background: `linear-gradient(90deg, ${ch.color}40, ${chapters[i + 1].color}25)`,
                width: "clamp(24px, 5vw, 60px)",
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────────
export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="timeline"
      ref={ref}
      aria-labelledby="timeline-heading"
      className="page-container relative py-36 md:py-48 border-t border-white/5"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(168,255,120,0.025) 0%, transparent 70%)",
        }}
      />

      {/* Section header */}
      <div className="mb-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <span className="h-px w-10 bg-[#a8ff78]/50" />
          <span className="text-[#a8ff78] text-[10px] uppercase tracking-[0.38em] font-mono">
            Education &amp; Journey
          </span>
          <span className="h-px w-10 bg-[#a8ff78]/50" />
        </motion.div>

        <motion.h2
          id="timeline-heading"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="font-black text-white leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.8rem)" }}
        >
          The
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(90deg, #a8ff78, #78ffd6)",
            }}
          >
            Journey.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mt-6 text-white/35 max-w-lg text-sm md:text-base leading-relaxed"
        >
          Every milestone, challenge, and institution that shaped me as a
          Software Engineer.
        </motion.p>
      </div>

      {/* Chapter progress */}
      <ChapterProgress isInView={isInView} />

      {/* ── Vertical Timeline ──────────────────────────────────────────────── */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line — desktop center */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(168,255,120,0.18) 8%, rgba(168,255,120,0.18) 92%, transparent)",
          }}
        />
        {/* Vertical line — mobile left */}
        <div
          className="absolute left-5 top-0 bottom-0 w-px md:hidden"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(168,255,120,0.18) 8%, rgba(168,255,120,0.18) 92%, transparent)",
          }}
        />

        <ol className="flex flex-col gap-14 md:gap-16">
          {milestones.map((m, i) => {
            const isFuture = m.number === "05";
            return (
              <motion.li
                key={m.number}
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.1 + i * 0.12 }}
                className={`relative flex items-start ${
                  m.side === "right" ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* ── Center dot (desktop) ───────────────────────────────── */}
                <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-5 z-10">
                  <TimelineDot color={m.color} />
                </div>

                {/* ── Ghost number — opposite side on desktop ─────────────── */}
                <div
                  className={`hidden md:flex md:w-[calc(50%-28px)] items-start pt-2 ${
                    m.side === "right"
                      ? "pr-12 justify-end"
                      : "pl-12 justify-start"
                  }`}
                >
                  {m.side === "right" ? (
                    <span
                      className="font-black text-7xl leading-none select-none tracking-tighter"
                      style={{ color: `${m.color}10` }}
                    >
                      {m.number}
                    </span>
                  ) : (
                    <MilestoneCard milestone={m} isFuture={isFuture} />
                  )}
                </div>

                {/* ── Card side on desktop ────────────────────────────────── */}
                <div
                  className={`hidden md:block md:w-[calc(50%-28px)] ${
                    m.side === "right" ? "pl-12" : "pr-12"
                  }`}
                >
                  {m.side === "right" ? (
                    <MilestoneCard milestone={m} isFuture={isFuture} />
                  ) : (
                    <span
                      className="font-black text-7xl leading-none select-none tracking-tighter"
                      style={{ color: `${m.color}10` }}
                    >
                      {m.number}
                    </span>
                  )}
                </div>

                {/* ── Mobile layout ───────────────────────────────────────── */}
                <div className="md:hidden pl-14 w-full">
                  <MilestoneCard milestone={m} isFuture={isFuture} />
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
