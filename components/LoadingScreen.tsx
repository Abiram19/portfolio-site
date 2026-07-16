"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

// ── Deterministic particles (no SSR/client mismatch) ─────────────────────────
function seed(n: number) {
  const x = Math.sin(n) * 10000;
  return x - Math.floor(x);
}
const PARTICLES = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  left: seed(i * 7.391) * 100,
  top: seed(i * 13.657) * 100,
  size: seed(i * 3.127) * 2.5 + 0.7,
  dur: seed(i * 11.237) * 3 + 2.5,
  delay: seed(i * 5.891) * 3,
  opacity: seed(i * 17.431) * 0.32 + 0.07,
  color:
    i % 4 === 0
      ? "#00E5FF"
      : i % 4 === 1
        ? "#7CFF6B"
        : i % 4 === 2
          ? "#7C3AED"
          : "#ffffff",
}));

const LOAD_STEPS = [
  "LOADING PROJECTS",
  "LOADING RESEARCH",
  "LOADING EXPERIENCE",
  "LOADING CERTIFICATIONS",
  "INITIALIZING INTERFACE",
];

const RING_R = 56;
const CIRCUMFERENCE = 2 * Math.PI * RING_R;

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  const progressMV = useMotionValue(0);
  const dashOffset = useTransform(progressMV, [0, 100], [CIRCUMFERENCE, 0]);

  // ── Phase timers ────────────────────────────────────────────────────────────
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200), // INITIALIZING
      setTimeout(() => setPhase(2), 950), // LOADING PROFILE
      setTimeout(() => setPhase(3), 1650), // Progress ring
      setTimeout(() => setPhase(4), 2550), // Name reveal
      setTimeout(() => setExiting(true), 3500), // Exit
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // ── Loading steps cycling ────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 3) return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i >= LOAD_STEPS.length) {
        clearInterval(iv);
        return;
      }
      setStepIdx(i);
    }, 165);
    return () => clearInterval(iv);
  }, [phase]);

  // ── Progress fill animation ──────────────────────────────────────────────────
  useEffect(() => {
    if (phase < 3) return;
    const ctrl = animate(progressMV, 100, { duration: 0.95, ease: "easeOut" });
    const unsub = progressMV.on("change", (v) =>
      setDisplayProgress(Math.round(v)),
    );
    return () => {
      ctrl.stop();
      unsub();
    };
  }, [phase, progressMV]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!exiting && (
        <motion.div
          key="loading-screen"
          role="status"
          aria-label="Loading portfolio system"
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { duration: 0.4 } },
            exit: {
              opacity: 0,
              scale: 1.015,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none"
          style={{
            background:
              "radial-gradient(ellipse 140% 100% at 50% -10%, #060d1a 0%, #020408 55%, #010204 100%)",
          }}
        >
          {/* ── Digital grid ────────────────────────────────── */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,229,255,0.032) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.032) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />

          {/* ── Ambient corner glows ────────────────────────── */}
          <div
            className="absolute top-0 left-0 w-[520px] h-[520px] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 60%)",
              filter: "blur(70px)",
              transform: "translate(-25%, -25%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-[520px] h-[520px] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 60%)",
              filter: "blur(70px)",
              transform: "translate(25%, 25%)",
            }}
          />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[280px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(124,255,107,0.03) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* ── Floating particles ──────────────────────────── */}
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: p.color,
                opacity: p.opacity,
                boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
              }}
              animate={{
                y: [0, -18, 0],
                opacity: [p.opacity, p.opacity * 2.8, p.opacity],
              }}
              transition={{
                duration: p.dur,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* ── Scan line ───────────────────────────────────── */}
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.55) 50%, transparent 100%)",
              boxShadow: "0 0 10px rgba(0,229,255,0.3)",
            }}
            animate={{ top: ["-2%", "102%"] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0.7,
            }}
          />

          {/* ── Corner readouts ─────────────────────────────── */}
          <div className="absolute top-5 left-6 flex flex-col gap-1 pointer-events-none">
            <span
              className="text-[10px] font-mono tracking-[0.3em]"
              style={{ color: "rgba(0,229,255,0.38)" }}
            >
              AP_SYSTEM v2.0.0
            </span>
            <motion.span
              className="text-[9px] font-mono tracking-[0.18em]"
              style={{ color: "rgba(0,229,255,0.2)" }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              SYS://PORTFOLIO.ABIRAM.DEV
            </motion.span>
          </div>
          <div className="absolute top-5 right-6 flex items-center gap-3 pointer-events-none">
            <span
              className="text-[10px] font-mono tracking-[0.25em]"
              style={{ color: "rgba(0,229,255,0.3)" }}
            >
              SECURE
            </span>
            <span
              className="text-[10px] font-mono tracking-[0.25em] flex items-center gap-1.5"
              style={{ color: "rgba(124,255,107,0.6)" }}
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ●
              </motion.span>
              ONLINE
            </span>
          </div>
          <div
            className="absolute bottom-5 left-6 text-[9px] font-mono tracking-[0.18em] pointer-events-none"
            style={{ color: "rgba(0,229,255,0.16)" }}
          >
            BOOT_SEQ_ACTIVE
          </div>
          <div
            className="absolute bottom-5 right-6 text-[11px] font-mono font-bold tabular-nums tracking-[0.15em] pointer-events-none"
            style={{ color: "rgba(0,229,255,0.45)" }}
          >
            {displayProgress}%
          </div>

          {/* ── Phase content ────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {/* ── Phase 1 — Initializing ──────────────────────── */}
            {phase === 1 && (
              <motion.div
                key="phase-1"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center flex flex-col items-center gap-5"
              >
                <motion.p
                  className="text-[10px] font-mono tracking-[0.45em] uppercase"
                  style={{ color: "rgba(0,229,255,0.45)" }}
                  animate={{ opacity: [0.45, 0.9, 0.45] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                >
                  SYSTEM BOOT SEQUENCE
                </motion.p>
                <p
                  className="text-2xl sm:text-3xl md:text-4xl font-black font-mono tracking-[0.16em] uppercase"
                  style={{
                    color: "#00E5FF",
                    textShadow:
                      "0 0 40px rgba(0,229,255,0.6), 0 0 80px rgba(0,229,255,0.2)",
                  }}
                >
                  INITIALIZING SYSTEM
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.65, repeat: Infinity }}
                  >
                    _
                  </motion.span>
                </p>
                {/* Pulse dots */}
                <motion.div
                  className="flex gap-2 mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="w-[5px] h-[5px] rounded-full"
                      style={{ background: "#00E5FF" }}
                      animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [0.8, 1.3, 0.8],
                      }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        delay: i * 0.13,
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* ── Phase 2 — Loading Profile ────────────────────── */}
            {phase === 2 && (
              <motion.div
                key="phase-2"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center flex flex-col items-center gap-5"
              >
                <motion.p
                  className="text-[10px] font-mono tracking-[0.42em] uppercase"
                  style={{ color: "rgba(0,229,255,0.42)" }}
                  animate={{ opacity: [0.42, 0.85, 0.42] }}
                  transition={{ duration: 1.3, repeat: Infinity }}
                >
                  IDENTIFYING ENGINEER
                </motion.p>
                <p
                  className="text-xl sm:text-2xl md:text-3xl font-black font-mono tracking-[0.12em] uppercase"
                  style={{
                    color: "#00E5FF",
                    textShadow: "0 0 30px rgba(0,229,255,0.4)",
                  }}
                >
                  LOADING ENGINEER PROFILE
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.65, repeat: Infinity }}
                  >
                    _
                  </motion.span>
                </p>
                {/* Network nodes connecting */}
                <div className="relative w-52 h-8 mt-1">
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(0,229,255,0.6), rgba(124,255,107,0.6))",
                      left: "6%",
                      right: "6%",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                  />
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                      style={{
                        left: `${i * 22 + 5}%`,
                        background: i % 2 === 0 ? "#00E5FF" : "#7CFF6B",
                        boxShadow: `0 0 8px ${
                          i % 2 === 0 ? "#00E5FF" : "#7CFF6B"
                        }`,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: i * 0.09,
                        duration: 0.3,
                        ease: "backOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Phase 3 — Progress ring ──────────────────────── */}
            {phase === 3 && (
              <motion.div
                key="phase-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.38 }}
                className="flex flex-col items-center gap-8"
              >
                {/* Circular AI ring */}
                <div className="relative w-40 h-40">
                  <svg
                    viewBox="0 0 120 120"
                    fill="none"
                    className="absolute inset-0 w-full h-full"
                  >
                    {/* Outer decorative ring */}
                    <circle
                      cx="60"
                      cy="60"
                      r="58"
                      stroke="rgba(0,229,255,0.05)"
                      strokeWidth="1"
                    />
                    {/* Tick marks */}
                    {Array.from({ length: 36 }, (_, i) => {
                      const angle = (i * 10 * Math.PI) / 180;
                      const outer = 56;
                      const inner = i % 9 === 0 ? 47 : i % 3 === 0 ? 50 : 53;
                      const opacity =
                        i % 9 === 0 ? 0.45 : i % 3 === 0 ? 0.22 : 0.1;
                      const sw = i % 9 === 0 ? 1.5 : 1;
                      return (
                        <line
                          key={i}
                          x1={60 + outer * Math.cos(angle - Math.PI / 2)}
                          y1={60 + outer * Math.sin(angle - Math.PI / 2)}
                          x2={60 + inner * Math.cos(angle - Math.PI / 2)}
                          y2={60 + inner * Math.sin(angle - Math.PI / 2)}
                          stroke={`rgba(0,229,255,${opacity})`}
                          strokeWidth={sw}
                        />
                      );
                    })}
                    {/* Background track */}
                    <circle
                      cx="60"
                      cy="60"
                      r={RING_R}
                      stroke="rgba(0,229,255,0.07)"
                      strokeWidth="2.5"
                    />
                    {/* Progress arc */}
                    <defs>
                      <linearGradient
                        id="arcGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#00E5FF" />
                        <stop offset="50%" stopColor="#7C3AED" />
                        <stop offset="100%" stopColor="#7CFF6B" />
                      </linearGradient>
                    </defs>
                    <g transform="rotate(-90 60 60)">
                      <motion.circle
                        cx="60"
                        cy="60"
                        r={RING_R}
                        stroke="url(#arcGrad)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray={CIRCUMFERENCE}
                        style={{
                          strokeDashoffset: dashOffset,
                          filter: "drop-shadow(0 0 5px rgba(0,229,255,0.7))",
                        }}
                      />
                    </g>
                    {/* Inner rings */}
                    <circle
                      cx="60"
                      cy="60"
                      r="44"
                      stroke="rgba(0,229,255,0.04)"
                      strokeWidth="1"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="36"
                      stroke="rgba(124,255,107,0.03)"
                      strokeWidth="1"
                    />
                  </svg>

                  {/* Center percentage */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                      className="text-3xl font-black font-mono tabular-nums leading-none"
                      style={{
                        background: "linear-gradient(135deg, #00E5FF, #7CFF6B)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {displayProgress}
                    </span>
                    <span
                      className="text-[9px] font-mono tracking-[0.35em] mt-0.5"
                      style={{ color: "rgba(0,229,255,0.35)" }}
                    >
                      %
                    </span>
                  </div>

                  {/* Orbiting dot */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ transformOrigin: "center" }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "4px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#7CFF6B",
                        boxShadow:
                          "0 0 8px #7CFF6B, 0 0 18px rgba(124,255,107,0.6)",
                      }}
                    />
                  </motion.div>
                </div>

                {/* Loading steps */}
                <div className="flex flex-col items-start gap-[7px] min-w-[230px]">
                  {LOAD_STEPS.map((step, i) => (
                    <motion.div
                      key={step}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: i <= stepIdx ? 1 : 0, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span
                        className="text-[10px] font-mono w-3 flex-shrink-0"
                        style={{
                          color:
                            i < stepIdx
                              ? "#7CFF6B"
                              : i === stepIdx
                                ? "#00E5FF"
                                : "transparent",
                          textShadow:
                            i === stepIdx
                              ? "0 0 10px rgba(0,229,255,0.7)"
                              : "none",
                        }}
                      >
                        {i < stepIdx ? "✓" : "▸"}
                      </span>
                      <span
                        className="text-[10px] font-mono tracking-[0.2em]"
                        style={{
                          color:
                            i < stepIdx
                              ? "rgba(124,255,107,0.5)"
                              : i === stepIdx
                                ? "rgba(0,229,255,0.95)"
                                : "rgba(0,229,255,0.25)",
                          textShadow:
                            i === stepIdx
                              ? "0 0 12px rgba(0,229,255,0.4)"
                              : "none",
                        }}
                      >
                        {step}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Phase 4 — Name reveal ────────────────────────── */}
            {phase === 4 && (
              <motion.div
                key="phase-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center flex flex-col items-center gap-5 px-6"
              >
                {/* Glitch name */}
                <div className="relative">
                  {/* Glitch layer — cyan slice */}
                  <motion.div
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                    style={{ clipPath: "inset(30% 0 42% 0)" }}
                    animate={{ x: [0, -5, 4, -1, 0] }}
                    transition={{
                      duration: 0.065,
                      times: [0, 0.25, 0.5, 0.75, 1],
                      repeat: 6,
                      repeatDelay: 0.55,
                    }}
                  >
                    <p
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-[0.07em] uppercase whitespace-nowrap"
                      style={{ color: "#00E5FF", opacity: 0.65 }}
                    >
                      ABIRAM PATHMANATHAN
                    </p>
                  </motion.div>
                  {/* Glitch layer — green slice */}
                  <motion.div
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                    style={{ clipPath: "inset(58% 0 12% 0)" }}
                    animate={{ x: [0, 4, -3, 1, 0] }}
                    transition={{
                      duration: 0.065,
                      times: [0, 0.25, 0.5, 0.75, 1],
                      delay: 0.04,
                      repeat: 6,
                      repeatDelay: 0.55,
                    }}
                  >
                    <p
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-[0.07em] uppercase whitespace-nowrap"
                      style={{ color: "#7CFF6B", opacity: 0.45 }}
                    >
                      ABIRAM PATHMANATHAN
                    </p>
                  </motion.div>
                  {/* Main text — letter-spacing reveal */}
                  <motion.p
                    className="relative text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-[0.07em] uppercase whitespace-nowrap"
                    style={{
                      background:
                        "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.88) 45%, rgba(0,229,255,0.82) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 0 28px rgba(0,229,255,0.22))",
                    }}
                    initial={{ opacity: 0, letterSpacing: "0.28em" }}
                    animate={{ opacity: 1, letterSpacing: "0.07em" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    ABIRAM PATHMANATHAN
                  </motion.p>
                </div>

                {/* Subtitle */}
                <motion.p
                  className="text-[11px] font-mono tracking-[0.45em] uppercase"
                  style={{ color: "rgba(0,229,255,0.55)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.38 }}
                >
                  Software Engineer · Full Stack Developer
                </motion.p>

                {/* Separator line */}
                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.58 }}
                >
                  <div
                    className="h-px w-20"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(0,229,255,0.35))",
                    }}
                  />
                  <span
                    className="text-[9px] font-mono tracking-[0.4em] uppercase"
                    style={{ color: "rgba(0,229,255,0.3)" }}
                  >
                    SYSTEM READY
                  </span>
                  <div
                    className="h-px w-20"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(0,229,255,0.35), transparent)",
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
