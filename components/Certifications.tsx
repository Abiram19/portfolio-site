"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { certifications } from "@/lib/data/certifications";

export default function Certifications() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="certifications"
      ref={ref}
      aria-labelledby="certifications-heading"
      className="page-container relative py-48 md:py-60 border-t border-white/5 overflow-hidden"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(168,255,120,0.06) 0%, transparent 70%)",
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
            Certifications
          </span>
          <span className="h-px w-12 bg-[#a8ff78]/50" />
        </motion.div>

        <motion.h2
          id="certifications-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-black text-white leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          Continuous
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(90deg, #a8ff78, #78ffd6)",
            }}
          >
            learning.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-white/40 max-w-xl text-base leading-relaxed"
        >
          Verified credentials from world-class institutions in AI, machine
          learning, and software engineering.
        </motion.p>
      </div>

      {/* Certifications grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {certifications.map((cert, i) => (
          <Link key={cert.slug} href={`/certifications/${cert.slug}`} aria-label={`View certification details for ${cert.title}`} className="block">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative rounded-3xl p-10 flex flex-col gap-6 cursor-pointer overflow-hidden h-full"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.07)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Top glow line */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${cert.color}60, transparent)`,
                }}
              />

              {/* Icon + category */}
              <div className="flex items-start justify-between">
                <span className="text-3xl">{cert.icon}</span>
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                  style={{
                    background: `${cert.color}12`,
                    border: `1px solid ${cert.color}25`,
                    color: cert.color,
                  }}
                >
                  {cert.category}
                </span>
              </div>

              {/* Title & issuer */}
              <div>
                <h3 className="text-white font-bold text-base leading-snug mb-2">
                  {cert.title}
                </h3>
                <p className="text-white/30 text-xs font-medium uppercase tracking-wider">
                  {cert.issuer}
                </p>
                {cert.issuedDate && (
                  <p className="text-white/20 text-[11px] mt-1 font-mono">
                    {cert.issuedDate}
                  </p>
                )}
              </div>

              {/* Summary */}
              {cert.summary && (
                <p className="text-white/35 text-xs leading-relaxed line-clamp-3">
                  {cert.summary}
                </p>
              )}

              {/* Bottom: verified badge + view details */}
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <svg aria-hidden="true" className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13.5 4.5L6 12 2.5 8.5"
                      stroke={cert.color}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: `${cert.color}99` }}
                  >
                    Verified Certificate
                  </span>
                </div>
                <span
                  className="text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1"
                  style={{ color: cert.color }}
                >
                  View Details
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
