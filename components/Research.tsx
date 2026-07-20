"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { featuredResearch } from "@/lib/data/research";

export default function Research() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const { tags, titleParts, abstract, accentColor, highlights, methodology } =
    featuredResearch;

  return (
    <section
      id="research"
      ref={ref}
      aria-labelledby="research-heading"
      className="page-container relative py-48 md:py-60 border-t border-white/5 overflow-hidden"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Section header */}
      <div className="mb-24 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <span className="h-px w-12 bg-[#06b6d4]/50" />
          <span className="text-[#06b6d4] text-xs uppercase tracking-[0.3em] font-semibold">
            Research &amp; Innovation
          </span>
          <span className="h-px w-12 bg-[#06b6d4]/50" />
        </motion.div>

        <motion.h2
          id="research-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-black text-white leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          Academic
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(90deg, #06b6d4, #78ffd6)",
            }}
          >
            research.
          </span>
        </motion.h2>
      </div>

      {/* Featured research card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Top glow line */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(6,182,212,0.5), transparent)",
          }}
        />

        <div className="p-10 md:p-16 lg:p-20">
          {/* Tag row */}
          <div className="flex flex-wrap gap-3 mb-10">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: `${accentColor}14`,
                  border: `1px solid ${accentColor}33`,
                  color: `${accentColor}cc`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Paper title */}
          <h3
            className="font-black text-white leading-tight mb-8"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            {titleParts.prefix}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(90deg, ${accentColor}, #78ffd6)`,
              }}
            >
              {titleParts.accent}
            </span>
            {titleParts.suffix}
          </h3>

          <p className="text-white/50 text-base md:text-lg leading-relaxed mb-16 max-w-3xl">
            {abstract}
          </p>

          {/* Highlight metrics row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="rounded-2xl p-5 text-center"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p className="text-white font-bold text-sm mb-1">{h.value}</p>
                <p className="text-white/30 text-[11px] uppercase tracking-wider">
                  {h.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Methodology steps */}
          <div>
            <p className="text-white/30 text-xs uppercase tracking-[0.25em] font-semibold mb-10">
              Methodology
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {methodology.map((m, i) => (
                <motion.div
                  key={m.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="rounded-2xl p-7"
                  style={{
                    background: `${m.color}06`,
                    border: `1px solid ${m.color}18`,
                  }}
                >
                  <span
                    className="text-4xl font-black leading-none block mb-5"
                    style={{ color: `${m.color}20` }}
                  >
                    {m.step}
                  </span>
                  <h4
                    className="text-sm font-bold mb-3"
                    style={{ color: m.color }}
                  >
                    {m.title}
                  </h4>
                  <p className="text-white/40 text-xs leading-relaxed">
                    {m.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
