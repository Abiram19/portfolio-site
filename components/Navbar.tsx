"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { navLinks } from "@/lib/data/contact";
import type { NavLink } from "@/lib/data/contact";

// ─── Magnetic Nav Link ───────────────────────────────────────────────────────
function NavLinkItem({
  link,
  isActive,
  onClick,
}: {
  link: NavLink;
  isActive: boolean;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 22 });
  const springY = useSpring(y, { stiffness: 300, damping: 22 });

  return (
    <motion.a
      ref={ref}
      href={link.href}
      onClick={onClick}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: springX, y: springY }}
      className="relative px-3 py-2 text-sm font-medium cursor-pointer select-none group"
    >
      {/* Text */}
      <motion.span
        className="relative z-10 block transition-colors duration-200"
        animate={{
          color: isActive ? "#00E5FF" : "rgba(255,255,255,0.5)",
          textShadow: isActive ? "0 0 20px rgba(0,229,255,0.5)" : "none",
        }}
        whileHover={{ color: "#ffffff" }}
        transition={{ duration: 0.18 }}
      >
        {link.label}
      </motion.span>

      {/* Hover background pill */}
      <motion.span
        className="absolute inset-0 rounded-lg"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{ background: "rgba(255,255,255,0.05)" }}
        transition={{ duration: 0.15 }}
      />

      {/* Active underline */}
      <motion.span
        className="absolute left-3 right-3 rounded-full"
        style={{
          bottom: "2px",
          height: "1.5px",
          background: "linear-gradient(90deg, #00E5FF, #7CFF6B)",
          boxShadow: "0 0 10px rgba(0,229,255,0.6)",
          transformOrigin: "left",
        }}
        animate={{
          scaleX: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </motion.a>
  );
}

// ─── Logo Mark ────────────────────────────────────────────────────────────────
function LogoMark() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="/"
      aria-label="Abiram Pathmanathan — Home"
      className="flex items-center gap-3 flex-shrink-0 group"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Icon mark */}
      <div className="relative w-8 h-8 flex-shrink-0">
        {/* Ambient glow */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background:
              "radial-gradient(circle, rgba(0,229,255,0.3) 0%, transparent 70%)",
            filter: "blur(8px)",
            transform: "scale(1.6)",
          }}
        />
        {/* Spinning ring */}
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
        {/* Inner face */}
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

      {/* Wordmark */}
      <div className="hidden sm:flex items-baseline gap-0.5">
        <span
          className="text-[13px] font-bold tracking-tight"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
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
        <span
          className="text-[13px] font-bold tracking-tight"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          {"/>"}
        </span>
      </div>
    </motion.a>
  );
}

// ─── Status Chip ─────────────────────────────────────────────────────────────
function StatusChip({ fullWidth = false }: { fullWidth?: boolean }) {
  return (
    <motion.a
      href="#contact"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      className={`relative flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold cursor-pointer overflow-hidden flex-shrink-0 ${
        fullWidth ? "w-full justify-center" : ""
      }`}
      style={{
        background: "rgba(124,255,107,0.06)",
        border: "1px solid rgba(124,255,107,0.2)",
        color: "#7CFF6B",
      }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        variants={{ hover: { opacity: 1 }, rest: { opacity: 0 } }}
        initial="rest"
        style={{
          background: "rgba(124,255,107,0.09)",
          boxShadow: "inset 0 0 20px rgba(124,255,107,0.08)",
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Outer glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        variants={{ hover: { opacity: 1 }, rest: { opacity: 0 } }}
        initial="rest"
        style={{ boxShadow: "0 0 20px rgba(124,255,107,0.2)" }}
        transition={{ duration: 0.2 }}
      />

      {/* Pulse dot */}
      <span className="relative flex-shrink-0 flex items-center justify-center w-2 h-2">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
          style={{ background: "#7CFF6B" }}
        />
        <span
          className="relative rounded-full w-2 h-2"
          style={{
            background: "#7CFF6B",
            boxShadow: "0 0 6px rgba(124,255,107,0.8)",
          }}
        />
      </span>

      <span className="relative whitespace-nowrap">Open to Opportunities</span>
    </motion.a>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);

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

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-35% 0px -55% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: hidden && !menuOpen ? -120 : 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* ── Full-width glass bar ──────────────────────────── */}
      <div
        className="relative w-full"
        style={{
          background: scrolled ? "rgba(5,8,18,0.85)" : "rgba(5,10,22,0.6)",
          backdropFilter: scrolled
            ? "blur(28px) saturate(200%)"
            : "blur(18px) saturate(160%)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          boxShadow: scrolled
            ? "0 0 0 1px rgba(255,255,255,0.04) inset, 0 4px 32px rgba(0,0,0,0.55), 0 0 80px rgba(0,229,255,0.025)"
            : "0 0 0 1px rgba(255,255,255,0.02) inset",
          transition:
            "background 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        {/* Top edge gradient line */}
        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.4) 25%, rgba(124,255,107,0.35) 75%, transparent 100%)",
            opacity: scrolled ? 0.9 : 0.35,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Ambient center glow */}
        <div
          className="absolute inset-x-0 top-0 h-full pointer-events-none overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(0,229,255,0.03) 0%, transparent 100%)",
          }}
        />

        {/* ── Inner content container ─────────────────────── */}
        <div
          className="relative flex items-center justify-between mx-auto"
          style={{
            maxWidth: "1440px",
            paddingLeft: "clamp(20px, 4vw, 40px)",
            paddingRight: "clamp(20px, 4vw, 40px)",
            height: scrolled ? "62px" : "80px",
            transition: "height 0.3s ease",
          }}
        >
          {/* LEFT — Logo */}
          <LogoMark />

          {/* CENTER — Nav links absolutely centered */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-12"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {navLinks.map((link) => (
              <NavLinkItem
                key={link.id}
                link={link}
                isActive={activeSection === link.id}
              />
            ))}
          </nav>

          {/* RIGHT — Status chip */}
          <div className="hidden lg:flex items-center">
            <StatusChip />
          </div>

          {/* MOBILE — Hamburger */}
          <motion.button
            className="lg:hidden relative flex flex-col items-center justify-center w-9 h-9 rounded-lg gap-[5px]"
            style={{
              background: menuOpen ? "rgba(255,255,255,0.06)" : "transparent",
            }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            whileTap={{ scale: 0.93 }}
          >
            <motion.span
              className="block w-[18px] h-px rounded-full bg-white/75"
              animate={menuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
            />
            <motion.span
              className="block w-[18px] h-px rounded-full bg-white/75"
              animate={
                menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.18 }}
            />
            <motion.span
              className="block w-[18px] h-px rounded-full bg-white/75"
              animate={
                menuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.22 }}
            />
          </motion.button>
        </div>
      </div>

      {/* ── Mobile dropdown ───────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -10, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, y: -6, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden w-full"
            style={{
              background: "rgba(5,8,18,0.97)",
              backdropFilter: "blur(32px)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.65)",
            }}
          >
            <div
              style={{
                maxWidth: "1440px",
                margin: "0 auto",
                padding: "4px clamp(20px, 4vw, 40px) 20px",
              }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 transition-colors duration-150"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    color:
                      activeSection === link.id
                        ? "#00E5FF"
                        : "rgba(255,255,255,0.6)",
                  }}
                >
                  <span className="text-[15px] font-medium">{link.label}</span>
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="mobile-indicator"
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "#00E5FF",
                        boxShadow: "0 0 8px rgba(0,229,255,0.7)",
                      }}
                    />
                  )}
                </motion.a>
              ))}
              <div className="pt-5">
                <StatusChip fullWidth />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
