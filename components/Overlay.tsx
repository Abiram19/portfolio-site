"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextSection {
  startProgress: number; // 0-1: when to start fading in
  peakProgress: number; // when fully visible
  endProgress: number; // when to fade out
  text: string;
  subtext?: string;
  align: "left" | "center" | "right";
}

const sections: TextSection[] = [
  {
    startProgress: 0,
    peakProgress: 0.04,
    endProgress: 0.18,
    text: "Abiram\nPathmanathan.",
    subtext: "Software Engineer · Full Stack Developer · ML Researcher",
    align: "center",
  },
  {
    startProgress: 0.22,
    peakProgress: 0.3,
    endProgress: 0.46,
    text: "Building Intelligent\nSoftware.",
    subtext: "Scalable systems, machine learning, and AI-powered applications",
    align: "left",
  },
  {
    startProgress: 0.5,
    peakProgress: 0.6,
    endProgress: 0.76,
    text: "From Research\nto Production.",
    subtext: "Bridging academic AI with real-world engineering",
    align: "right",
  },
  {
    startProgress: 0.8,
    peakProgress: 0.88,
    endProgress: 1.0,
    text: "Let's build something\nextraordinary.",
    subtext: "Scroll to explore",
    align: "center",
  },
];

function TextOverlaySection({
  section,
  scrollYProgress,
}: {
  section: TextSection;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(
    scrollYProgress,
    [
      section.startProgress,
      section.peakProgress,
      section.endProgress - 0.04,
      section.endProgress,
    ],
    [0, 1, 1, 0],
  );

  const yOffset = useTransform(
    scrollYProgress,
    [section.startProgress, section.peakProgress, section.endProgress],
    [40, 0, -40],
  );

  return (
    <motion.div
      style={{ opacity, y: yOffset }}
      className="absolute inset-0 z-10 flex flex-col justify-center pointer-events-none"
    >
      <div className="page-container flex flex-col justify-center h-full">
        <div
          className={`flex flex-col ${
            section.align === "center"
              ? "items-center text-center"
              : section.align === "left"
                ? "items-start text-left"
                : "items-end text-right"
          }`}
        >
          <div className="max-w-3xl md:max-w-4xl">
            {/* Label chip */}
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              style={{ opacity }}
            >
              <span
                className="h-px w-8 bg-[#a8ff78]"
                style={{
                  display: section.align === "right" ? "none" : "block",
                }}
              />
              <span className="text-[#a8ff78] text-xs uppercase tracking-[0.25em] font-semibold">
                Software Engineer
              </span>
              <span
                className="h-px w-8 bg-[#a8ff78]"
                style={{ display: section.align === "left" ? "none" : "block" }}
              />
            </motion.div>

            {/* Main headline */}
            <h2
              className="font-black text-white leading-[0.95] tracking-tight"
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                whiteSpace: "pre-line",
                textShadow: "0 0 80px rgba(0,0,0,0.8)",
              }}
            >
              {section.text}
            </h2>

            {/* Subtext */}
            {section.subtext && (
              <p
                className="mt-4 text-white/50 font-light tracking-wide"
                style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.25rem)" }}
              >
                {section.subtext}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Attach scroll tracking to the outer 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scroll indicator opacity — must be at top level (Rules of Hooks)
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.05],
    [1, 0],
  );

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: "500vh", marginTop: "-500vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {sections.map((section) => (
          <TextOverlaySection
            key={section.text}
            section={section}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Scroll indicator - visible only at start */}
        <motion.div
          aria-hidden="true"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-white/40 text-xs uppercase tracking-[0.2em]">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-[#a8ff78] to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}
