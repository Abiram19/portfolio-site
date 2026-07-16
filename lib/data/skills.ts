// ─── Skills Data ──────────────────────────────────────────────────────────────

// Used in About.tsx — "Core Stack" bento card
export interface CoreSkill {
  name: string;
  color: string;
  /** react-icons component key — resolved in About.tsx ICON_MAP */
  icon: string;
  /** Category group label shown as a section divider */
  group:
    | "Frontend"
    | "Backend"
    | "Databases"
    | "Artificial Intelligence"
    | "Cloud & DevOps"
    | "Development Tools";
}

export const coreSkills: CoreSkill[] = [
  // ── Frontend ────────────────────────────────────────────────────────────────
  { name: "React",        color: "#22d3ee", icon: "SiReact",       group: "Frontend" },
  { name: "Next.js",      color: "#e2e8f0", icon: "SiNextdotjs",   group: "Frontend" },
  { name: "Angular",      color: "#f87171", icon: "SiAngular",     group: "Frontend" },
  { name: "TypeScript",   color: "#60a5fa", icon: "SiTypescript",  group: "Frontend" },
  { name: "Tailwind CSS", color: "#38bdf8", icon: "SiTailwindcss", group: "Frontend" },
  { name: "HTML5",        color: "#fb923c", icon: "SiHtml5",       group: "Frontend" },
  { name: "CSS3",         color: "#818cf8", icon: "SiCss",         group: "Frontend" },
  { name: "JavaScript",   color: "#fbbf24", icon: "SiJavascript",  group: "Frontend" },

  // ── Backend ─────────────────────────────────────────────────────────────────
  { name: "Node.js",      color: "#4ade80", icon: "SiNodedotjs",       group: "Backend" },
  { name: "Express.js",   color: "#94a3b8", icon: "SiExpress",         group: "Backend" },
  { name: "NestJS",       color: "#e11d48", icon: "SiNestjs",          group: "Backend" },
  { name: "ASP.NET Core", color: "#a78bfa", icon: "SiDotnet",          group: "Backend" },
  { name: "REST APIs",    color: "#34d399", icon: "TbApi",             group: "Backend" },
  { name: "JWT Auth",     color: "#fcd34d", icon: "SiJsonwebtokens",   group: "Backend" },

  // ── Databases ───────────────────────────────────────────────────────────────
  { name: "MongoDB",     color: "#4ade80", icon: "SiMongodb",    group: "Databases" },
  { name: "PostgreSQL",  color: "#22d3ee", icon: "SiPostgresql", group: "Databases" },
  { name: "SQL Server",  color: "#60a5fa", icon: "TbDatabase",   group: "Databases" },

  // ── Artificial Intelligence ──────────────────────────────────────────────────
  { name: "Python",          color: "#fbbf24", icon: "SiPython",         group: "Artificial Intelligence" },
  { name: "Scikit-Learn",    color: "#fb923c", icon: "SiScikitlearn",    group: "Artificial Intelligence" },
  { name: "XGBoost",         color: "#a78bfa", icon: "TbChartHistogram", group: "Artificial Intelligence" },
  { name: "Machine Learning",color: "#34d399", icon: "TbBrain",          group: "Artificial Intelligence" },
  { name: "Explainable AI",  color: "#f9a8d4", icon: "TbChartDots",      group: "Artificial Intelligence" },

  // ── Cloud & DevOps ───────────────────────────────────────────────────────────
  { name: "Azure DevOps", color: "#60a5fa", icon: "TbBrandAzure",       group: "Cloud & DevOps" },
  { name: "Git",          color: "#f87171", icon: "SiGit",              group: "Cloud & DevOps" },
  { name: "GitHub",       color: "#e2e8f0", icon: "SiGithub",           group: "Cloud & DevOps" },
  { name: "Docker",       color: "#38bdf8", icon: "SiDocker",           group: "Cloud & DevOps" },
  { name: "CI/CD",        color: "#a8ff78", icon: "TbGitMerge",         group: "Cloud & DevOps" },
  { name: "Vercel",       color: "#e2e8f0", icon: "SiVercel",           group: "Cloud & DevOps" },
  { name: "Railway",      color: "#a78bfa", icon: "SiRailway",          group: "Cloud & DevOps" },
  { name: "Render",       color: "#4ade80", icon: "SiRender",           group: "Cloud & DevOps" },

  // ── Development Tools ────────────────────────────────────────────────────────
  { name: "VS Code",        color: "#38bdf8", icon: "TbBrandVscode",        group: "Development Tools" },
  { name: "Visual Studio",  color: "#a78bfa", icon: "TbBrandVisualStudio",  group: "Development Tools" },
  { name: "Postman",        color: "#fb923c", icon: "SiPostman",            group: "Development Tools" },
  { name: "Figma",          color: "#f87171", icon: "SiFigma",              group: "Development Tools" },
];

// Used in About.tsx — "Engineering Expertise" card
export interface SkillCategory {
  label: string;
  color: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: "Frontend",
    color: "#22d3ee",
    skills: [
      "React",
      "Next.js",
      "Angular",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
    ],
  },
  {
    label: "Backend",
    color: "#4ade80",
    skills: [
      "Node.js",
      "Express.js",
      "NestJS",
      "ASP.NET Core",
      "REST API Design",
      "JWT Authentication",
      "Middleware & Auth",
    ],
  },
  {
    label: "Databases",
    color: "#60a5fa",
    skills: [
      "MongoDB",
      "PostgreSQL",
      "SQL Server",
      "Schema Design",
      "Query Optimization",
    ],
  },
  {
    label: "Artificial Intelligence",
    color: "#a78bfa",
    skills: [
      "Python",
      "Scikit-Learn",
      "XGBoost",
      "Machine Learning",
      "Explainable AI",
      "Data Analysis",
      "NumPy",
      "Pandas",
    ],
  },
  {
    label: "Cloud & DevOps",
    color: "#a8ff78",
    skills: [
      "Azure DevOps",
      "Git",
      "GitHub",
      "Docker",
      "CI/CD Pipelines",
      "Vercel",
      "Railway",
      "Render",
    ],
  },
  {
    label: "Development Tools",
    color: "#fb923c",
    skills: [
      "VS Code",
      "Visual Studio",
      "Postman",
      "Figma",
      "Agile / Scrum",
      "Clean Architecture",
    ],
  },
];
