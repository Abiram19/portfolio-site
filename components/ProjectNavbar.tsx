"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// ── Logo Mark (reused visual from main Navbar) ────────────────────────────────
function LogoMark() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="flex items-center gap-3 flex-shrink-0 group cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Link href="/" aria-label="Abiram Pathmanathan - Home" className="flex items-center gap-3">
        <div aria-hidden="true" className="relative w-8 h-8 flex-shrink-0">
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "radial-gradient(circle, rgba(0,229,255,0.3) 0%, transparent 70%)",
              filter: "blur(8px)",
              transform: "scale(1.6)",
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{
              background:
                "conic-gradient(from 0deg, #00E5FF 0%, #7C3AED 40%, #7CFF6B 70%, #00E5FF 100%)",
              padding: "1.5px",
            }}
          >
            <div
              className="w-full h-full rounded-[10px]"
              style={{ background: "#060810" }}
            />
          </motion.div>
          <div
            className="absolute rounded-[9px] flex items-center justify-center"
            style={{
              inset: "3px",
              background:
                "linear-gradient(135deg, rgba(0,229,255,0.08) 0%, rgba(124,58,237,0.08) 100%)",
            }}
          >
            <span
              className="text-[9px] font-black tracking-tighter leading-none"
              style={{
                background: "linear-gradient(135deg, #00E5FF 0%, #7CFF6B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AP
            </span>
          </div>
        </div>
        <div aria-hidden="true" className="hidden sm:flex items-baseline gap-0.5">
          <span className="text-[13px] font-bold tracking-tight" style={{ color: "rgba(255,255,255,0.9)" }}>
            {"<"}
          </span>
          <span
            className="text-[13px] font-black tracking-tight"
            style={{
              background: "linear-gradient(90deg, #00E5FF, #7CFF6B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AP
          </span>
          <span className="text-[13px] font-bold tracking-tight" style={{ color: "rgba(255,255,255,0.9)" }}>
            {"/>"}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Back Button ───────────────────────────────────────────────────────────────
function BackButton() {
  return (
    <Link href="/#projects" aria-label="Back to Portfolio projects">
      <motion.div
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "rgba(255,255,255,0.6)",
        }}
        whileHover={{
          background: "rgba(255,255,255,0.07)",
          color: "rgba(255,255,255,0.9)",
          borderColor: "rgba(255,255,255,0.15)",
        }}
        transition={{ duration: 0.2 }}
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
        <span>Back to Portfolio</span>
      </motion.div>
    </Link>
  );
}

// ── Open to Opportunities Chip ────────────────────────────────────────────────
function StatusChip() {
  return (
    <Link href="/#contact" aria-label="Open to Opportunities - Contact me">
      <motion.div
        className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold cursor-pointer"
        style={{
          background: "rgba(124,255,107,0.06)",
          border: "1px solid rgba(124,255,107,0.2)",
          color: "#7CFF6B",
        }}
        whileHover={{
          background: "rgba(124,255,107,0.1)",
          boxShadow: "0 0 20px rgba(124,255,107,0.15)",
        }}
        transition={{ duration: 0.2 }}
      >
        <span className="relative flex items-center justify-center w-2 h-2 flex-shrink-0">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
            style={{ background: "#7CFF6B" }}
          />
          <span
            className="relative rounded-full w-2 h-2"
            style={{ background: "#7CFF6B", boxShadow: "0 0 6px rgba(124,255,107,0.8)" }}
          />
        </span>
        <span className="whitespace-nowrap">Open to Opportunities</span>
      </motion.div>
    </Link>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function ProjectNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastScrollY.current && y > 400);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className="relative w-full"
        style={{
          background: scrolled ? "rgba(5,8,18,0.85)" : "rgba(5,10,22,0.6)",
          backdropFilter: scrolled ? "blur(28px) saturate(200%)" : "blur(18px) saturate(160%)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          boxShadow: scrolled
            ? "0 0 0 1px rgba(255,255,255,0.04) inset, 0 4px 32px rgba(0,0,0,0.55)"
            : "0 0 0 1px rgba(255,255,255,0.02) inset",
          transition: "background 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        {/* Top edge gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.4) 25%, rgba(124,255,107,0.35) 75%, transparent 100%)",
            opacity: scrolled ? 0.9 : 0.35,
            transition: "opacity 0.3s ease",
          }}
        />

        <nav
          aria-label="Project navigation"
          className="relative flex items-center justify-between mx-auto"
          style={{
            maxWidth: "1440px",
            paddingLeft: "clamp(20px, 4vw, 40px)",
            paddingRight: "clamp(20px, 4vw, 40px)",
            height: scrolled ? "62px" : "80px",
            transition: "height 0.3s ease",
          }}
        >
          <LogoMark />
          <BackButton />
          <StatusChip />
        </nav>
      </div>
    </motion.header>
  );
}
