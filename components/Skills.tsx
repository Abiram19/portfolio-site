"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skillCategories } from "@/lib/data/skills";

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="skills"
      ref={ref}
      aria-labelledby="skills-heading"
      className="page-container relative py-48 md:py-60 border-t border-white/5 overflow-hidden"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
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
          <span className="h-px w-12 bg-[#a8ff78]/50" />
          <span className="text-[#a8ff78] text-xs uppercase tracking-[0.3em] font-semibold">
            Technical Skills
          </span>
          <span className="h-px w-12 bg-[#a8ff78]/50" />
        </motion.div>

        <motion.h2
          id="skills-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-black text-white leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          The tools I
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(90deg, #a8ff78, #78ffd6)",
            }}
          >
            wield.
          </span>
        </motion.h2>
      </div>

      {/* Skills Grid — Bento style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-14">
        {skillCategories.map((cat, catIdx) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: catIdx * 0.1 }}
            className={`rounded-3xl p-10 md:p-12 flex flex-col gap-8 ${cat.label === "AI & Machine Learning" ? "md:col-span-2 lg:col-span-1" : ""}`}
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.07)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Category header */}
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: cat.color }}
              />
              <h3
                className="text-xs uppercase tracking-[0.25em] font-semibold"
                style={{ color: cat.color }}
              >
                {cat.label}
              </h3>
            </div>

            {/* Skill pills */}
            <div className="flex flex-wrap gap-2.5">
              {cat.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 0.2 + catIdx * 0.1 + i * 0.04,
                    duration: 0.35,
                  }}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white cursor-default transition-all duration-300"
                  style={{
                    background: `${cat.color}0d`,
                    border: `1px solid ${cat.color}22`,
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
