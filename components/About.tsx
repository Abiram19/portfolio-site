"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { coreSkills } from "@/lib/data/skills";
import { profile } from "@/lib/data/profile";

// ── react-icons/si ─────────────────────────────────────────────────────────────
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiAngular,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiDotnet,
  SiPostgresql,
  SiMongodb,
  SiPython,
  SiScikitlearn,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiGit,
  SiGithub,
  SiVercel,
  SiRailway,
  SiRender,
  SiDocker,
  SiPostman,
  SiFigma,
  SiJsonwebtokens,
} from "react-icons/si";
import type { IconType } from "react-icons";

// ── react-icons/fa ─────────────────────────────────────────────────────────────
import { FaJava } from "react-icons/fa";

// ── react-icons/tb ─────────────────────────────────────────────────────────────
import {
  TbChartHistogram,
  TbBrain,
  TbChartDots,
  TbApi,
  TbDatabase,
  TbGitMerge,
  TbBrandAzure,
  TbBrandVscode,
  TbBrandVisualStudio,
  // What I Build icons
  TbBuildingSkyscraper,
  TbCode,
  TbCloud,
  TbLayoutDashboard,
  TbRobot,
  TbCalendarEvent,
  TbShieldLock,
  TbCreditCard,
  TbPlugConnected,
  TbDevices,
  TbWorldWww,
} from "react-icons/tb";

// ── Icon lookup map ────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, IconType> = {
  // SI — Frontend
  SiReact:       SiReact,
  SiNextdotjs:   SiNextdotjs,
  SiAngular:     SiAngular,
  SiTypescript:  SiTypescript,
  SiTailwindcss: SiTailwindcss,
  SiHtml5:       SiHtml5,
  SiCss:         SiCss,
  SiJavascript:  SiJavascript,
  // SI — Backend
  SiNodedotjs:      SiNodedotjs,
  SiExpress:        SiExpress,
  SiNestjs:         SiNestjs,
  SiDotnet:         SiDotnet,
  SiJsonwebtokens:  SiJsonwebtokens,
  // SI — Database
  SiPostgresql: SiPostgresql,
  SiMongodb:    SiMongodb,
  // SI — AI
  SiPython:     SiPython,
  SiScikitlearn: SiScikitlearn,
  // SI — Cloud & DevOps
  SiGit:    SiGit,
  SiGithub: SiGithub,
  SiVercel: SiVercel,
  SiRailway: SiRailway,
  SiRender:  SiRender,
  SiDocker:  SiDocker,
  // SI — Tools
  SiPostman: SiPostman,
  SiFigma:   SiFigma,
  // FA
  SiJava: FaJava,
  // TB — AI stand-ins
  TbChartHistogram: TbChartHistogram,
  TbBrain:          TbBrain,
  TbChartDots:      TbChartDots,
  // TB — Backend
  TbApi: TbApi,
  // TB — Database
  TbDatabase: TbDatabase,
  // TB — Cloud & DevOps
  TbGitMerge:  TbGitMerge,
  TbBrandAzure: TbBrandAzure,
  // TB — Tools
  TbBrandVscode:        TbBrandVscode,
  TbBrandVisualStudio:  TbBrandVisualStudio,
};

// ── Group display order ────────────────────────────────────────────────────────
const GROUP_ORDER = [
  "Frontend",
  "Backend",
  "Databases",
  "Artificial Intelligence",
  "Cloud & DevOps",
  "Development Tools",
] as const;

// ── Group accent colors (for divider labels) ────────────────────────────────────
const GROUP_COLOR: Record<string, string> = {
  "Frontend":              "#22d3ee",
  "Backend":               "#4ade80",
  "Databases":             "#60a5fa",
  "Artificial Intelligence": "#a78bfa",
  "Cloud & DevOps":        "#a8ff78",
  "Development Tools":     "#fb923c",
};

// ── Shared glass card base ─────────────────────────────────────────────────────
function GlassCard({
  children,
  className = "",
  style = {},
  delay = 0,
  isInView,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

// ── Biography Card ─────────────────────────────────────────────────────────────
function BiographyCard({ isInView }: { isInView: boolean }) {
  const [para0, para1, para2] = profile.bioParagraphs;

  return (
    <GlassCard
      isInView={isInView}
      delay={0.1}
      className="flex flex-col justify-between p-8 md:p-10"
      style={{
        background:
          "linear-gradient(135deg, rgba(34,211,238,0.04) 0%, rgba(255,255,255,0.02) 40%, rgba(168,255,120,0.03) 100%)",
        border: "1px solid rgba(34,211,238,0.12)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(34,211,238,0.5) 35%, rgba(168,255,120,0.35) 70%, transparent)",
        }}
      />
      {/* Left accent stripe */}
      <div
        className="absolute left-0 top-8 bottom-8 w-0.5 rounded-full"
        style={{
          background:
            "linear-gradient(to bottom, rgba(34,211,238,0.6), rgba(168,255,120,0.4))",
        }}
      />

      <div className="pl-4">
        {/* Label */}
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-8 bg-[#22d3ee]/50" />
          <span className="text-[10px] font-mono tracking-[0.38em] uppercase text-[#22d3ee]/60">
            Software Engineer
          </span>
        </div>

        {/* Headline */}
        <h3
          className="font-black leading-[1.08] tracking-tight mb-8"
          style={{ fontSize: "clamp(1.85rem, 3.5vw, 2.85rem)" }}
        >
          <span className="text-white">{profile.aboutHeadline.line1}</span>
          <br />
          <span className="text-white/60">{profile.aboutHeadline.line2}</span>
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(90deg, #22d3ee, #a8ff78)",
            }}
          >
            {profile.aboutHeadline.accent}
          </span>
        </h3>

        {/* Bio paragraphs */}
        <div className="space-y-4 text-white/50 leading-relaxed text-sm md:text-base">
          {/* Paragraph 0 — intro with name + university highlights */}
          <p>
            {para0.prefix}
            <span className="text-white font-semibold">{para0.nameHighlight}</span>
            {para0.suffix}
            <span className="text-white/75">{para0.universityHighlight}</span>
            {para0.rest}
          </p>

          {/* Paragraph 1 — work spans */}
          <p>
            {para1.prefix}
            {para1.highlights!.map((h, i) => (
              <span key={h}>
                <span className="text-white/80">{h}</span>
                {i < para1.highlights!.length - 1 &&
                  (i === para1.highlights!.length - 2 ? ", and " : ", ")}
              </span>
            ))}
            {para1.suffix}
          </p>

          {/* Paragraph 2 — professional summary */}
          {"standalone" in para2 && (
            <p className="text-white/40 text-sm leading-relaxed border-t border-white/5 pt-4">
              {(para2 as { standalone: string }).standalone}
            </p>
          )}
        </div>

        {/* Identity tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {[
            { label: "Full Stack",        color: "#22d3ee" },
            { label: "Software Engineer", color: "#a8ff78" },
            { label: "AI Engineer",       color: "#a78bfa" },
            { label: "Open to Work",      color: "#4ade80" },
          ].map(({ label, color }) => (
            <span
              key={label}
              className="px-3 py-1 rounded-full text-[11px] font-medium"
              style={{
                background: `${color}10`,
                border: `1px solid ${color}25`,
                color: `${color}cc`,
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pl-4 pt-6 mt-6 border-t border-white/5">
        <p className="text-[11px] font-mono text-white/20">{profile.degreeFooter}</p>
      </div>
    </GlassCard>
  );
}

// ── Metrics Card ───────────────────────────────────────────────────────────────
function MetricsCard({ isInView }: { isInView: boolean }) {
  return (
    <GlassCard
      isInView={isInView}
      delay={0.2}
      className="flex flex-col justify-between p-7 md:p-8"
      style={{
        background:
          "linear-gradient(160deg, rgba(167,139,250,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(167,139,250,0.12)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(167,139,250,0.5), transparent)",
        }}
      />
      <h3 className="text-[10px] font-mono tracking-[0.32em] uppercase mb-6 text-[#a78bfa]/60">
        At a Glance
      </h3>
      <div className="flex flex-col gap-5 flex-1">
        {profile.stats.map((stat, idx) => (
          <div
            key={stat.label}
            className={`${idx < profile.stats.length - 1 ? "pb-5 border-b border-white/5" : ""}`}
          >
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + idx * 0.08 }}
              className="font-black text-3xl leading-none tabular-nums"
              style={{
                background: `linear-gradient(135deg, ${stat.color}, ${stat.color}99)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {stat.value}
            </motion.p>
            <p className="text-white/35 text-[11px] mt-1.5 font-medium tracking-wide uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <p className="text-[10px] font-mono text-white/15 mt-6">// Built to ship</p>
    </GlassCard>
  );
}

// ── Engineering Highlights Card ────────────────────────────────────────────────
function HighlightsCard({ isInView }: { isInView: boolean }) {
  return (
    <GlassCard
      isInView={isInView}
      delay={0.32}
      className="flex flex-col p-7 md:p-8"
      style={{
        background:
          "linear-gradient(160deg, rgba(168,255,120,0.04) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(168,255,120,0.1)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(168,255,120,0.4), transparent)",
        }}
      />
      <h3 className="text-[10px] font-mono tracking-[0.32em] uppercase mb-5 text-[#a8ff78]/60">
        Highlights
      </h3>
      <ul className="flex flex-col gap-2.5 flex-1">
        {profile.highlights.map((item, idx) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -8 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.38 + idx * 0.05 }}
            className="flex items-center gap-2.5 text-white/55 text-[12px] leading-snug"
          >
            <span
              aria-hidden="true"
              className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black"
              style={{
                background: "rgba(168,255,120,0.12)",
                border: "1px solid rgba(168,255,120,0.25)",
                color: "#a8ff78",
              }}
            >
              ✓
            </span>
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
      <p className="text-[10px] font-mono text-white/15 mt-5">// Engineering excellence</p>
    </GlassCard>
  );
}

// ── Core Technology Stack Card — full width ────────────────────────────────────
function CoreStackCard({ isInView }: { isInView: boolean }) {
  const grouped = GROUP_ORDER.reduce<Record<string, typeof coreSkills>>(
    (acc, g) => {
      acc[g] = coreSkills.filter((s) => s.group === g);
      return acc;
    },
    {}
  );

  let badgeIndex = 0;

  return (
    <GlassCard
      isInView={isInView}
      delay={0.25}
      className="flex flex-col p-7 md:p-8 lg:p-10"
    >
      {/* Card header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[10px] font-mono tracking-[0.32em] uppercase text-white/30">
          Core Technology Stack
        </h3>
        <span
          className="text-[9px] font-mono px-2 py-0.5 rounded"
          style={{
            color: "rgba(168,255,120,0.5)",
            background: "rgba(168,255,120,0.05)",
            border: "1px solid rgba(168,255,120,0.12)",
          }}
        >
          {coreSkills.length} TECHNOLOGIES
        </span>
      </div>

      {/* Groups — 2-col grid on md+, 1-col on mobile */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-5"
        role="list"
        aria-label="Core technology stack"
      >
        {GROUP_ORDER.map((groupName) => {
          const skills = grouped[groupName];
          if (!skills || skills.length === 0) return null;
          const accentColor = GROUP_COLOR[groupName] ?? "rgba(255,255,255,0.2)";

          return (
            <div key={groupName}>
              {/* Group label */}
              <div className="flex items-center gap-2 mb-2.5">
                <span
                  className="h-px w-4 rounded-full"
                  style={{ background: `${accentColor}60` }}
                />
                <p
                  className="text-[8.5px] font-mono tracking-[0.32em] uppercase"
                  style={{ color: `${accentColor}90` }}
                >
                  {groupName}
                </p>
              </div>

              {/* Badge row */}
              <div className="flex flex-wrap gap-1.5" role="group" aria-label={groupName}>
                {skills.map((skill) => {
                  const idx = badgeIndex++;
                  const Icon = ICON_MAP[skill.icon];

                  return (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        delay: 0.3 + idx * 0.025,
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      whileHover={{
                        scale: 1.08,
                        y: -2,
                        boxShadow: `0 0 14px ${skill.color}40`,
                      }}
                      tabIndex={0}
                      role="listitem"
                      aria-label={skill.name}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-default select-none focus:outline-none focus-visible:ring-1"
                      style={{
                        background: `${skill.color}0d`,
                        border: `1px solid ${skill.color}22`,
                        color: skill.color,
                        ["--tw-ring-color" as string]: `${skill.color}60`,
                        transition: "box-shadow 0.2s ease, transform 0.2s ease",
                      }}
                    >
                      {Icon && (
                        <Icon
                          size={11}
                          aria-hidden="true"
                          style={{ flexShrink: 0, opacity: 0.82, color: skill.color }}
                        />
                      )}
                      <span className="leading-none whitespace-nowrap">{skill.name}</span>
                    </motion.span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <p className="text-[10px] font-mono text-white/15 mt-6">
        // Full Stack · AI · Cloud · DevOps
      </p>
    </GlassCard>
  );
}

// ── Engineering Philosophy Card ────────────────────────────────────────────────
function PhilosophyCard({ isInView }: { isInView: boolean }) {
  return (
    <GlassCard
      isInView={isInView}
      delay={0.22}
      className="flex flex-col justify-between p-7 md:p-8 lg:p-10"
      style={{
        background:
          "linear-gradient(120deg, rgba(34,211,238,0.03) 0%, rgba(255,255,255,0.02) 60%, rgba(168,255,120,0.025) 100%)",
      }}
    >
      {/* Left quote accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
        style={{
          background:
            "linear-gradient(to bottom, rgba(34,211,238,0.5), rgba(168,255,120,0.3))",
        }}
      />

      <div className="pl-6">
        <h3
          className="text-[10px] font-mono tracking-[0.32em] uppercase mb-6"
          style={{ color: `${profile.focus.accentColor}99` }}
        >
          Engineering Philosophy
        </h3>

        <p
          className="font-black leading-tight tracking-tight mb-5"
          style={{
            fontSize: "clamp(1.25rem, 2.5vw, 1.85rem)",
            fontStyle: "italic",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.55) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          &ldquo;{profile.focus.title}&rdquo;
        </p>

        <p className="text-white/40 text-sm leading-relaxed max-w-xl">
          {profile.focus.description}
        </p>
      </div>

      <div className="pl-6 pt-5 border-t border-white/5 mt-6 flex flex-col gap-1">
        {profile.focus.footerLines.map((line) => (
          <span key={line} className="text-[11px] font-mono text-white/20">
            {line}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}

// ── What I Build Card ──────────────────────────────────────────────────────────
const BUILD_CAPABILITIES = [
  {
    icon: TbBuildingSkyscraper,
    label: "Enterprise Web Applications",
    desc: "Scalable, multi-user platforms for business operations",
    color: "#22d3ee",
  },
  {
    icon: TbCode,
    label: "Custom Business Software",
    desc: "Bespoke systems tailored to your workflows and requirements",
    color: "#a8ff78",
  },
  {
    icon: TbBrain,
    label: "AI-Powered Applications",
    desc: "Intelligent software with ML inference and automation",
    color: "#a78bfa",
  },
  {
    icon: TbCloud,
    label: "SaaS Platforms",
    desc: "Multi-tenant subscription products built for scale",
    color: "#60a5fa",
  },
  {
    icon: TbApi,
    label: "REST API Development",
    desc: "Well-structured, versioned, and documented APIs",
    color: "#4ade80",
  },
  {
    icon: TbLayoutDashboard,
    label: "Admin Dashboards",
    desc: "Data-rich control panels for management and analytics",
    color: "#fb923c",
  },
  {
    icon: TbRobot,
    label: "Business Automation Systems",
    desc: "Workflow automation that reduces manual overhead",
    color: "#f9a8d4",
  },
  {
    icon: TbCalendarEvent,
    label: "Booking & Reservation Systems",
    desc: "Real-time scheduling and availability management",
    color: "#34d399",
  },
  {
    icon: TbChartHistogram,
    label: "Machine Learning Solutions",
    desc: "Predictive models and data-driven decision systems",
    color: "#a78bfa",
  },
  {
    icon: TbDatabase,
    label: "Database Design & Architecture",
    desc: "Optimised schemas for reliability and performance",
    color: "#38bdf8",
  },
  {
    icon: TbShieldLock,
    label: "Authentication & Authorization",
    desc: "Secure identity, roles, and access control systems",
    color: "#fbbf24",
  },
  {
    icon: TbCreditCard,
    label: "Payment Integration",
    desc: "Secure checkout flows and subscription billing",
    color: "#4ade80",
  },
  {
    icon: TbPlugConnected,
    label: "Third-Party API Integration",
    desc: "Connecting your software to external platforms and services",
    color: "#fb923c",
  },
  {
    icon: TbDevices,
    label: "Responsive Web Applications",
    desc: "Pixel-perfect interfaces across all screen sizes",
    color: "#22d3ee",
  },
] as const;

function WhatIBuildCard({ isInView }: { isInView: boolean }) {
  return (
    <GlassCard
      isInView={isInView}
      delay={0.28}
      className="flex flex-col p-7 md:p-8"
      style={{
        background:
          "linear-gradient(135deg, rgba(34,211,238,0.03) 0%, rgba(255,255,255,0.02) 60%, rgba(167,139,250,0.025) 100%)",
        border: "1px solid rgba(34,211,238,0.08)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(34,211,238,0.35) 40%, rgba(167,139,250,0.25) 70%, transparent)",
        }}
      />

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[10px] font-mono tracking-[0.32em] uppercase text-white/30">
          What I Build
        </h3>
        <span
          className="text-[9px] font-mono px-2 py-0.5 rounded"
          style={{
            color: "rgba(34,211,238,0.5)",
            background: "rgba(34,211,238,0.05)",
            border: "1px solid rgba(34,211,238,0.12)",
          }}
        >
          {BUILD_CAPABILITIES.length} CAPABILITIES
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1">
        {BUILD_CAPABILITIES.map(({ icon: Icon, label, desc, color }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.32 + idx * 0.04,
              duration: 0.38,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex items-start gap-3 rounded-xl p-3 group"
            style={{
              background: `${color}07`,
              border: `1px solid ${color}15`,
              transition: "background 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = `${color}12`;
              (e.currentTarget as HTMLDivElement).style.borderColor = `${color}28`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = `${color}07`;
              (e.currentTarget as HTMLDivElement).style.borderColor = `${color}15`;
            }}
          >
            {/* Icon badge */}
            <span
              className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5"
              style={{
                background: `${color}12`,
                border: `1px solid ${color}25`,
              }}
            >
              <Icon size={14} style={{ color, opacity: 0.85 }} aria-hidden="true" />
            </span>

            {/* Text */}
            <div className="min-w-0">
              <p
                className="text-[11.5px] font-semibold leading-tight mb-0.5"
                style={{ color: `${color}dd` }}
              >
                {label}
              </p>
              <p className="text-white/30 text-[10.5px] leading-snug">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-[10px] font-mono text-white/15 mt-5">
        // End-to-end · Scalable · Production-Ready
      </p>
    </GlassCard>
  );
}

// ── Availability Card ──────────────────────────────────────────────────────────
function AvailabilityCard({ isInView }: { isInView: boolean }) {
  return (
    <GlassCard
      isInView={isInView}
      delay={0.35}
      className="flex flex-col justify-between p-7 md:p-8"
      style={{
        background:
          "linear-gradient(150deg, rgba(168,255,120,0.04) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(168,255,120,0.15)",
        boxShadow:
          "0 0 40px rgba(168,255,120,0.04), inset 0 0 30px rgba(168,255,120,0.02)",
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(168,255,120,0.55), transparent)",
        }}
      />

      <div className="flex flex-col gap-5 flex-1">
        <h3 className="text-[10px] font-mono tracking-[0.32em] uppercase text-[#4ade80]/60">
          Status
        </h3>

        {/* Pulsing status indicator */}
        <div
          className="flex items-center gap-3 rounded-xl p-4"
          style={{
            background: "rgba(168,255,120,0.06)",
            border: "1px solid rgba(168,255,120,0.18)",
          }}
        >
          <span className="relative flex h-3 w-3 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a8ff78] opacity-60" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#a8ff78]" />
          </span>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">
              {profile.availability.statusText}
            </p>
            <p className="text-white/35 text-[11px] mt-0.5">
              {profile.availability.statusSubtext}
            </p>
          </div>
        </div>

        {/* Available for list */}
        <div>
          <p className="text-white/35 text-[9px] font-mono tracking-[0.3em] uppercase mb-3">
            Available for:
          </p>
          <ul className="flex flex-col gap-2">
            {profile.availability.availableFor.map((item, idx) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -6 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.5 + idx * 0.05 }}
                className="flex items-center gap-2 text-white/50 text-[12px]"
              >
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-black"
                  style={{
                    background: "rgba(168,255,120,0.1)",
                    border: "1px solid rgba(168,255,120,0.22)",
                    color: "#a8ff78",
                  }}
                >
                  ✓
                </span>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* CTA footer note */}
        <p
          className="text-[10px] font-mono leading-relaxed"
          style={{ color: "rgba(168,255,120,0.35)" }}
        >
          {profile.availability.ctaFooter}
        </p>
      </div>

      <motion.a
        href={profile.availability.ctaHref}
        aria-label={`Initiate contact: ${profile.availability.ctaLabel}`}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-[#0a0f0a] tracking-wide"
        style={{
          background: "linear-gradient(135deg, #a8ff78, #78ffd6)",
          boxShadow: "0 0 24px rgba(168,255,120,0.25)",
        }}
        whileHover={{ scale: 1.02, boxShadow: "0 0 36px rgba(168,255,120,0.35)" }}
        whileTap={{ scale: 0.98 }}
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1L15 8L8 15M1 8H15"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {profile.availability.ctaLabel}
      </motion.a>
    </GlassCard>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────────
export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-heading"
      className="page-container relative py-36 md:py-48 border-t border-white/5"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/4"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none translate-x-1/4 translate-y-1/4"
        style={{
          background:
            "radial-gradient(circle, rgba(168,255,120,0.035) 0%, transparent 65%)",
        }}
      />

      {/* Section header */}
      <div className="mb-16 md:mb-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <span className="h-px w-10 bg-[#22d3ee]/40" />
          <span className="text-[10px] font-mono tracking-[0.38em] uppercase text-[#22d3ee]/60">
            About Me
          </span>
          <span className="h-px w-10 bg-[#22d3ee]/40" />
        </motion.div>

        <motion.h2
          id="about-heading"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="font-black text-white leading-[1.06] tracking-tight"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)" }}
        >
          The Engineer
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(90deg, #22d3ee, #a8ff78)",
            }}
          >
            Behind the Code.
          </span>
        </motion.h2>
      </div>

      {/*
        ── Bento Grid Layout ───────────────────────────────────────────────────
        Desktop (lg, 3-col):
          Row 1: [Biography ×2col]        [Metrics ×1col]
          Row 2: [Philosophy ×2col]        [Highlights ×1col]
          Row 3: [Core Stack ×3col — full width]
          Row 4: [Expertise ×2col]         [Availability ×1col]

        Tablet (md, 2-col): biography/philosophy span 2-col, others natural
        Mobile (1-col): stacked vertically
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">

        {/* ── Row 1 ───────────────────────────────────────────────────────── */}
        {/* Biography — 2-col on md+, 2-col on lg */}
        <div className="md:col-span-1 lg:col-span-2">
          <BiographyCard isInView={isInView} />
        </div>

        {/* Metrics — 1-col */}
        <MetricsCard isInView={isInView} />

        {/* ── Row 2 ───────────────────────────────────────────────────────── */}
        {/* Philosophy — 2-col on md+, 2-col on lg */}
        <div className="md:col-span-1 lg:col-span-2">
          <PhilosophyCard isInView={isInView} />
        </div>

        {/* Highlights — 1-col */}
        <HighlightsCard isInView={isInView} />

        {/* ── Row 3 — Core Stack Full Width ───────────────────────────────── */}
        <div className="md:col-span-2 lg:col-span-3">
          <CoreStackCard isInView={isInView} />
        </div>

        {/* ── Row 4 ───────────────────────────────────────────────────────── */}
        {/* What I Build — 2-col on md+, 2-col on lg */}
        <div className="md:col-span-1 lg:col-span-2">
          <WhatIBuildCard isInView={isInView} />
        </div>

        {/* Availability — 1-col */}
        <AvailabilityCard isInView={isInView} />

      </div>
    </section>
  );
}
