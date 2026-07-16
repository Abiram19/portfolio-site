// ─── Profile Data ─────────────────────────────────────────────────────────────
// Central source of truth for personal identity, bio, stats, and status.

export const profile = {
  name: "Abiram Pathmanathan",
  initials: "AP",
  title: "Software Engineer · Full Stack Developer",
  degree: "BSc (Hons) Computer Science & Technology",
  university: "Uva Wellassa University of Sri Lanka",
  universityUrl: "https://www.uwu.ac.lk/",
  degreeFooter: "// BSc (Hons) Computer Science & Technology · Uva Wellassa University",

  // About section — biography card
  aboutHeadline: {
    line1: "Crafting software,",
    line2: "one system ",
    accent: "at a time.",
  },

  bioParagraphs: [
    {
      prefix: "I'm ",
      nameHighlight: "Abiram Pathmanathan",
      suffix:
        ", a Computer Science and Technology undergraduate at ",
      universityHighlight: "Uva Wellassa University of Sri Lanka",
      rest: ". I specialize in full-stack development and AI engineering — building systems that are fast, intelligent, and production-ready.",
    },
    {
      prefix: "My work spans ",
      highlights: ["full-stack web platforms", "AI-powered applications", "machine learning research"],
      suffix:
        ". I explore the intersection of software engineering and artificial intelligence to solve real-world problems at scale.",
    },
    {
      prefix: "",
      highlights: [] as string[],
      suffix: "",
      standalone:
        "I enjoy building software that solves real business problems — from enterprise management systems and AI-powered applications to scalable SaaS platforms. My focus is writing clean, maintainable, secure, and production-ready software that creates measurable value for businesses and users.",
    },
  ],

  // At-a-glance stats card
  stats: [
    { value: "Final Year", label: "CS Undergraduate",        color: "#22d3ee" },
    { value: "6+",         label: "Production Projects",     color: "#4ade80" },
    { value: "7+",         label: "Certifications",          color: "#fb923c" },
    { value: "15+",        label: "Core Technologies",       color: "#a78bfa" },
  ],

  // Focus card
  focus: {
    accentColor: "#22d3ee",
    title: "Software engineering with purpose",
    description:
      "I build full-stack software products that are robust, scalable, and maintainable. From database design to polished UIs — I engineer end-to-end systems that solve real-world problems with clarity and craft.",
    footerLines: [
      "// Full Stack · Software Engineering",
      "// REST APIs · Cloud · Databases",
    ],
  },

  // Engineering Highlights card
  highlights: [
    "Full Stack Web Applications",
    "AI-Powered Software Solutions",
    "REST API Architecture",
    "Enterprise Database Design",
    "Clean Architecture",
    "Azure DevOps Workflow",
    "Machine Learning Research",
    "Agile Development",
    "Production-Ready Systems",
    "Custom Business Software",
  ],

  // Availability / status card
  availability: {
    statusText: "Open to Opportunities",
    statusSubtext: "Software Engineering Roles · Custom Software Development",
    availableFor: [
      "Software Engineering Roles",
      "Full Stack Development",
      "AI Applications",
      "SaaS Development",
      "Custom Business Software",
      "API Development",
      "Technical Consulting",
    ],
    ctaFooter: "Available for Full-Time Roles • Freelance Projects • Remote Collaboration",
    ctaLabel: "Get in Touch",
    ctaHref: "#contact",
  },

  // Contact section footer line
  contactFooter: "// Software Engineer · Full Stack Developer · Available 2026",
} as const;
