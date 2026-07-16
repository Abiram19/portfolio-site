// ─── Certifications Data ──────────────────────────────────────────────────────
// To add a new certification: add an entry here + optionally add
// public/certifications/<slug>/certificate.jpg for detail page image.
// No component changes required.

export interface Certification {
  // ── Core identity ──────────────────────────────────────────────────────────
  slug: string;
  title: string;
  issuer: string;
  issuerUrl?: string;
  category: string;
  color: string;
  icon: string;

  // ── Date & credential ──────────────────────────────────────────────────────
  issuedDate?: string;          // e.g. "March 2024"
  expiryDate?: string;          // e.g. "March 2026" or undefined if no expiry
  credentialId?: string;        // e.g. "UC-a1b2c3d4"

  // ── Verification & assets ─────────────────────────────────────────────────
  verificationUrl?: string;     // Official verify URL from issuer
  certificateImage?: string;    // Path in /public/certifications/<slug>/certificate.jpg
  certificatePdf?: string;      // Path in /public/certifications/<slug>/certificate.pdf

  // ── Detail page content ───────────────────────────────────────────────────
  summary?: string;             // Short 1-2 sentence summary for card
  description?: string;         // Full professional description for detail page
  skills?: string[];            // Skills covered in this certification
  learningOutcomes?: string[];  // Bullet list of key learning outcomes
  topics?: string[];            // Technologies / topics covered (grid)

  /** @deprecated use slug-based routing. Kept for backward compat. */
  link?: string;
}

export const certifications: Certification[] = [
  // ── AI & Programming ───────────────────────────────────────────────────────
  {
    slug: "ai-python-for-beginners",
    title: "AI Python for Beginners: Basics of AI Python",
    issuer: "DeepLearning.AI",
    issuerUrl: "https://www.deeplearning.ai/",
    category: "AI & Programming",
    color: "#a8ff78",
    icon: "🧠",
    issuedDate: "September 2024",
    expiryDate: undefined,
    credentialId: undefined,
    verificationUrl: undefined,
    certificateImage: "/certifications/ai-python-for-beginners/certificate.jpg",
    summary:
      "Introduced Python programming fundamentals through the lens of AI, covering data handling, functions, prompt engineering, and LLM-assisted workflows.",
    description:
      "This certification introduced Python programming fundamentals through the lens of artificial intelligence. It covered Python basics, data handling, functions, variables, prompt engineering, and practical applications of large language models. By building AI-assisted programs from the ground up, the course provided a strong foundation for developing intelligent applications and understanding how AI integrates into modern software workflows.",
    skills: [
      "Python Programming",
      "Data Handling",
      "Large Language Models",
      "Prompt Engineering",
      "Functions",
      "Variables",
      "AI-Assisted Coding",
    ],
    learningOutcomes: [
      "Write and execute Python programs from scratch",
      "Understand core programming fundamentals such as variables and data types",
      "Work with data structures and file handling in Python",
      "Build reusable, modular functions",
      "Create dynamic prompts for LLM integrations",
      "Apply AI-assisted workflows to accelerate development",
    ],
    topics: [
      "Python Basics",
      "Variables & Data Types",
      "Functions",
      "Data Handling",
      "Prompt Engineering",
      "Large Language Models",
      "AI APIs",
      "LLM Workflows",
    ],
  },
  {
    slug: "deeplearning-ai-certification",
    title: "AI Python for Beginners: Automating Tasks with Python",
    issuer: "DeepLearning.AI",
    issuerUrl: "https://www.deeplearning.ai/",
    category: "AI & Programming",
    color: "#78ffd6",
    icon: "⚡",
    issuedDate: "September 2024",
    expiryDate: undefined,
    credentialId: undefined,
    verificationUrl: undefined,
    certificateImage: "/certifications/deeplearning-ai-certification/certificate.jpg",
    summary:
      "Focused on using Python to automate repetitive tasks and improve productivity through loops, data structures, and AI-assisted workflows.",
    description:
      "This certification focused on using Python to automate repetitive tasks and improve developer productivity. It introduced practical automation techniques including loops, lists, and dictionaries for data organization and processing. The course built on Python fundamentals to demonstrate how AI-assisted programming concepts can streamline real-world workflows, reducing manual effort and enabling scalable task automation.",
    skills: [
      "Python",
      "Task Automation",
      "Loops",
      "Lists",
      "Dictionaries",
      "Data Processing",
      "Workflow Automation",
    ],
    learningOutcomes: [
      "Automate repetitive tasks using Python scripts",
      "Use loops efficiently to process data at scale",
      "Work with lists and dictionaries for structured data storage",
      "Process, filter, and compare datasets programmatically",
      "Build end-to-end automation workflows",
      "Apply AI-assisted programming concepts in practical scenarios",
    ],
    topics: [
      "Python Loops",
      "Lists & Dictionaries",
      "Task Automation",
      "Data Processing",
      "Control Flow",
      "File Operations",
      "AI-Assisted Programming",
      "Workflow Design",
    ],
  },
  {
    slug: "machine-learning-specialization",
    title: "Using JavaScript with AI: Enhancing Development Workflows",
    issuer: "Coursera Project Network",
    issuerUrl: "https://www.coursera.org/",
    category: "AI & Programming",
    color: "#06b6d4",
    icon: "🤖",
    issuedDate: "September 30, 2024",
    expiryDate: undefined,
    credentialId: "695B73HEIC40",
    verificationUrl: undefined,
    certificatePdf: "/certifications/machine-learning-specialization/certificate.pdf",
    summary:
      "Focused on integrating AI services and machine learning APIs into JavaScript development workflows to build intelligent, AI-powered web applications.",
    description:
      "This certification focused on integrating artificial intelligence into JavaScript development workflows. It covered AI-powered automation, machine learning API integration, and the development of intelligent web applications. The course demonstrated how to leverage AI services to enhance developer productivity, automate complex tasks, and implement scalable AI-driven features within modern JavaScript projects.",
    skills: [
      "JavaScript",
      "AI Integration",
      "Machine Learning APIs",
      "Workflow Automation",
      "AI-Assisted Development",
      "API Integration",
      "Intelligent Applications",
    ],
    learningOutcomes: [
      "Integrate AI services and APIs into JavaScript projects",
      "Automate repetitive development tasks using AI-driven tools",
      "Build AI-powered web applications with real-time intelligence",
      "Consume and implement machine learning APIs effectively",
      "Improve overall developer productivity with AI-assisted tooling",
      "Design and implement scalable AI features in production applications",
    ],
    topics: [
      "JavaScript",
      "AI APIs",
      "Machine Learning APIs",
      "Workflow Automation",
      "API Integration",
      "AI-Assisted Development",
      "Intelligent Web Apps",
      "Developer Tooling",
    ],
  },

  // ── Web Development ────────────────────────────────────────────────────────
  {
    slug: "learn-svelte",
    title: "Learn Svelte",
    issuer: "Scrimba",
    issuerUrl: "https://scrimba.com/",
    category: "Web Development",
    color: "#f43f5e",
    icon: "🔥",
    issuedDate: "September 30, 2024",
    expiryDate: undefined,
    credentialId: "4IUMFHI60AEW",
    verificationUrl: undefined,
    certificatePdf: "/certifications/learn-svelte/certificate.pdf",
    summary:
      "Hands-on course covering Svelte's reactive programming model, component-based architecture, and building high-performance web applications.",
    description:
      "Learn Svelte introduced modern frontend development using the Svelte framework. The course focused on building high-performance web applications through reactive programming, reusable UI components, and efficient frontend architecture. By working with Svelte's declarative syntax and event-driven model, the course provided a practical understanding of how Svelte compiles components at build time to deliver lightweight, blazing-fast web interfaces.",
    skills: [
      "Svelte",
      "Component-Based Architecture",
      "Reactive Programming",
      "Declarative Programming",
      "UI Components",
      "Event-Driven Programming",
      "Frontend Development",
      "Web Applications",
    ],
    learningOutcomes: [
      "Build complete web applications using the Svelte framework",
      "Create reusable, encapsulated UI components",
      "Understand and leverage Svelte's reactivity model",
      "Implement declarative, readable frontend code",
      "Develop interactive and event-driven web interfaces",
      "Optimize frontend performance using Svelte's compile-time approach",
    ],
    topics: [
      "Svelte",
      "Reactive Stores",
      "Component Architecture",
      "Event Handling",
      "Props & Bindings",
      "Lifecycle Methods",
      "Transitions & Animations",
      "SvelteKit Basics",
    ],
  },

  // ── Business & Finance ─────────────────────────────────────────────────────
  {
    slug: "business-foundation",
    title: "Business Foundations: Organizations, Planning, Finance",
    issuer: "Coursera",
    issuerUrl: "https://www.coursera.org/",
    category: "Business & Finance",
    color: "#8b5cf6",
    icon: "💼",
    issuedDate: "October 6, 2024",
    expiryDate: undefined,
    credentialId: undefined,
    verificationUrl: undefined,
    certificateImage: "/certifications/business-foundation/certificate.jpg",
    summary:
      "Comprehensive course covering business planning, organizational management, financial decision-making, and strategic leadership.",
    description:
      "This certification provided a comprehensive understanding of business planning, organizational management, leadership, and financial decision-making. It strengthened strategic thinking and business problem-solving capabilities by exploring how organizations are structured, how resources are planned and allocated, and how financial acumen underpins effective leadership. The course bridges the gap between technical expertise and the business context in which software products are built and delivered.",
    skills: [
      "Strategic Planning",
      "Financial Management",
      "Business Strategy",
      "Team Leadership",
      "Resource Management",
      "Decision Making",
      "Organizational Strategy",
      "Financial Acumen",
    ],
    learningOutcomes: [
      "Apply strategic thinking to business planning and decision-making",
      "Understand how organizational structures influence team performance",
      "Improve team leadership and collaborative management capabilities",
      "Develop and evaluate business plans and roadmaps",
      "Strengthen financial literacy and fiscal decision-making skills",
      "Align technical operations with overarching business goals",
    ],
    topics: [
      "Business Strategy",
      "Organizational Design",
      "Financial Planning",
      "Team Leadership",
      "Resource Allocation",
      "Decision Frameworks",
      "Business Communication",
      "Stakeholder Management",
    ],
  },
  {
    slug: "stock-market-fundamentals",
    title: "Stock Market Course — Beginners",
    issuer: "Ceylon Exchange Mentoring",
    issuerUrl: undefined,
    category: "Business & Finance",
    color: "#f59e0b",
    icon: "📈",
    issuedDate: "September 11, 2024",
    expiryDate: undefined,
    credentialId: undefined,
    verificationUrl: undefined,
    certificatePdf: "/certifications/stock-market-fundamentals/certificate.pdf",
    summary:
      "Foundational knowledge of stock market investing, portfolio management, risk assessment, and financial analysis techniques.",
    description:
      "This certification provided foundational knowledge of stock market investing, portfolio management, risk assessment, and financial analysis. It covered stock market fundamentals including equity valuation, technical and fundamental analysis techniques, key financial metrics, and long-term investment strategies. The program built confidence in interpreting market trends, making data-informed investment decisions, and managing portfolio risk effectively.",
    skills: [
      "Investment Strategies",
      "Equity Investment",
      "Portfolio Diversification",
      "Risk Management",
      "Fundamental Analysis",
      "Technical Analysis",
      "Financial Metrics",
      "Financial Decision Making",
    ],
    learningOutcomes: [
      "Understand how stock markets operate and how equities are traded",
      "Analyze stocks using key financial metrics and ratios",
      "Apply both technical and fundamental analysis methodologies",
      "Identify and manage investment risk in a portfolio context",
      "Build and maintain diversified investment portfolios",
      "Formulate and evaluate long-term investment strategies",
    ],
    topics: [
      "Stock Market Basics",
      "Equity Valuation",
      "Technical Analysis",
      "Fundamental Analysis",
      "Portfolio Management",
      "Risk Assessment",
      "Financial Ratios",
      "Market Trends",
    ],
  },

  // ── Marketing ──────────────────────────────────────────────────────────────
  {
    slug: "digital-marketing-fundamentals",
    title: "The Fundamentals of Digital Marketing",
    issuer: "Google Digital Garage",
    issuerUrl: "https://learndigital.withgoogle.com/",
    category: "Marketing",
    color: "#facc15",
    icon: "📢",
    issuedDate: "April 17, 2023",
    expiryDate: undefined,
    credentialId: "6Y3 MJJ 6PK",
    verificationUrl: undefined,
    certificatePdf: "/certifications/digital-marketing-fundamentals/certificate.pdf",
    summary:
      "Google-certified course covering SEO, SEM, Google Analytics, content marketing, social media strategy, and data-driven campaign management.",
    description:
      "The Fundamentals of Digital Marketing is a comprehensive certification from Google Digital Garage covering the essential principles of digital marketing, online advertising, analytics, SEO, SEM, content strategy, and business growth. The program provided practical knowledge on building effective marketing campaigns, optimizing websites for search engines, analyzing customer behavior, and driving online growth through data-driven marketing strategies. This credential is internationally recognized and accredited by the Interactive Advertising Bureau Europe and The Open University.",
    skills: [
      "SEO",
      "SEM",
      "Google Analytics",
      "Content Marketing",
      "Social Media Marketing",
      "Email Marketing",
      "Google Ads",
      "Website Optimization",
      "Conversion Optimization",
      "Digital Strategy",
    ],
    learningOutcomes: [
      "Understand and apply core digital marketing principles",
      "Implement effective SEO and SEM strategies to drive organic and paid traffic",
      "Build and manage content marketing campaigns across multiple channels",
      "Analyze website traffic and user behavior using analytics tools",
      "Optimize web pages and funnels for improved conversion rates",
      "Execute targeted social media marketing strategies",
      "Design and evaluate effective email marketing campaigns",
    ],
    topics: [
      "Search Engine Optimization",
      "Search Engine Marketing",
      "Google Analytics",
      "Google Ads",
      "Content Strategy",
      "Social Media Marketing",
      "Email Marketing",
      "Conversion Rate Optimization",
      "Web Analytics",
      "Digital Strategy",
    ],
  },
];

/** Helper: get a certification by slug. Returns undefined if not found. */
export function getCertificationBySlug(slug: string): Certification | undefined {
  return certifications.find((c) => c.slug === slug);
}
