// ─── Projects Data ────────────────────────────────────────────────────────────
// To add a new project: add an entry here + create public/projects/<slug>/
// No component changes required.

export interface ProjectOverview {
  problem: string;
  solution: string;
  impact: string;
}

export interface Project {
  // ── Core identity ──────────────────────────────────────────────────────────
  id: string;
  slug: string;
  year: string;
  category: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "research";
  role: string;
  duration: string;

  // ── Visuals ────────────────────────────────────────────────────────────────
  accentColor: string;
  gradient: string;
  /** Thumbnail shown on homepage card and project hero. Path in /public/ */
  thumbnailImage?: string;
  /** Gallery images shown in the lightbox section. Paths in /public/ */
  galleryImages?: string[];

  // ── Tech stack ─────────────────────────────────────────────────────────────
  tech: string[];

  // ── Links ──────────────────────────────────────────────────────────────────
  githubUrl?: string;
  /** Optional separate backend repo URL (for split frontend/backend projects) */
  githubBackendUrl?: string;
  liveDemoUrl?: string;
  /** Path to PDF in /public/projects/<slug>/ e.g. "/projects/allora-ai/docs.pdf" */
  documentationPdf?: string;
  /** YouTube URL or local path e.g. "/projects/allora-ai/demo.mp4" */
  videoUrl?: string;

  // ── Narrative ──────────────────────────────────────────────────────────────
  overview?: ProjectOverview;
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  lessonsLearned?: string[];
}

export const projects: Project[] = [
  {
    id: "01",
    slug: "allora-ai",
    year: "2024",
    category: "AI Platform · SaaS",
    title: "Allora.AI",
    description:
      "An AI-powered productivity platform featuring an AI Article Writer, Blog Generator, Resume Reviewer, AI Image Generation, Background Removal, and an integrated suite of intelligent productivity tools. Built for scale and real-world usage.",
    status: "completed",
    role: "Full Stack Developer",
    duration: "4 months",
    accentColor: "#8b5cf6",
    gradient: "from-violet-500/20 via-transparent to-transparent",
    tech: ["React", "Node.js", "Express.js", "PostgreSQL"],
    githubUrl: "https://github.com/Abiram19/AlloraAI-",
    liveDemoUrl: undefined,
    documentationPdf: "/projects/allora-ai/AlloraAI.pdf",
    videoUrl: undefined, // No video uploaded for Allora.AI
    thumbnailImage: "/projects/allora-ai/AlloraAI_thumbnail.png",
    galleryImages: undefined,
    overview: {
      problem:
        "Content creators and professionals spend enormous time on repetitive writing tasks — drafting articles, generating blog content, reviewing resumes, and editing images — using a fragmented collection of separate tools.",
      solution:
        "Allora.AI unifies these capabilities into a single AI-powered platform. Users get an integrated workspace with an Article Writer, Blog Generator, Resume Reviewer, AI Image Generation, and Background Removal — all powered by state-of-the-art language and vision models.",
      impact:
        "The platform dramatically reduces content creation time by automating repetitive writing tasks while maintaining quality, enabling creators to focus on strategy and ideas rather than execution.",
    },
    features: [
      "AI Article Writer with tone and length control",
      "Blog post generator with SEO-optimized output",
      "Resume reviewer with actionable improvement suggestions",
      "AI image generation from text prompts",
      "One-click background removal using computer vision",
      "Unified dashboard with project history",
      "REST API with JWT authentication",
      "Responsive web interface for all devices",
    ],
    challenges: [
      "Integrating multiple AI APIs with different rate limits and response formats into a unified interface",
      "Managing asynchronous AI processing without degrading the user experience",
      "Designing a scalable PostgreSQL schema that supports multiple AI tool types under one account",
      "Handling large image uploads securely and efficiently",
    ],
    solutions: [
      "Built an API orchestration layer that normalises responses from different AI providers into a consistent format",
      "Implemented a job queue pattern with polling so users get real-time feedback without blocking the UI",
      "Designed a polymorphic data model that stores any tool output generically, enabling easy feature additions",
      "Used multipart form data with server-side validation and size limits to handle image uploads safely",
    ],
    lessonsLearned: [
      "AI API abstraction layers pay dividends quickly — swapping providers took minutes, not days",
      "User-perceived performance matters more than raw speed; streaming responses feel much faster than waiting",
      "A well-designed PostgreSQL schema upfront avoids painful migrations later in a multi-feature SaaS",
      "Clear API documentation from day one accelerates both development and future maintenance",
    ],
  },
  {
    id: "02",
    slug: "explainable-ml-stock-volatility",
    year: "2025",
    category: "Research · Machine Learning",
    title: "Explainable ML for Stock Market Volatility",
    description:
      "Academic research project applying XGBoost, SHAP explainability, Ruptures change-point detection, and Scikit-Learn to model dynamic stock market volatility across multiple countries. Focused on interpretable AI and financial forecasting.",
    status: "research",
    role: "ML Researcher & Lead Developer",
    duration: "6 months",
    accentColor: "#06b6d4",
    gradient: "from-cyan-500/20 via-transparent to-transparent",
    tech: ["Python", "XGBoost", "SHAP", "Scikit-Learn", "Ruptures", "Pandas", "NumPy", "Matplotlib"],
    githubUrl: undefined,
    liveDemoUrl: undefined,
    documentationPdf: undefined,
    videoUrl: undefined,
    thumbnailImage: "/projects/explainable-ml-stock-volatility/ML project.png",
    galleryImages: undefined,
    overview: {
      problem:
        "Traditional financial volatility models treat markets as stationary systems with fixed dynamics. In reality, market regimes shift dramatically due to economic crises, policy changes, and geopolitical events — making static models unreliable for real-world forecasting.",
      solution:
        "The research applies Ruptures change-point detection to automatically segment market data into distinct regimes, then trains XGBoost models per regime. SHAP values provide full explainability — making it possible to understand exactly which features drive volatility predictions at each point in time.",
      impact:
        "The framework outperforms static baseline models and, crucially, provides interpretable explanations that financial analysts can audit and trust — addressing the 'black box' problem that limits AI adoption in regulated financial environments.",
    },
    features: [
      "Automated market regime detection using Ruptures change-point algorithms",
      "Per-regime XGBoost volatility forecasting models",
      "Full SHAP explainability with feature importance visualisations",
      "Multi-country dataset analysis (US, UK, India, Sri Lanka)",
      "Comparative benchmark against GARCH and standard ML baselines",
      "Interactive visualisation of regime transitions and SHAP waterfall plots",
      "Reproducible experiment pipeline with configuration files",
    ],
    challenges: [
      "Financial time-series data has complex autocorrelations that violate standard ML train/test split assumptions",
      "Choosing the right number of change-points without overfitting to noise in the data",
      "Ensuring SHAP values remain consistent and interpretable across different market regimes",
      "Handling missing data and different trading calendars across multi-country datasets",
    ],
    solutions: [
      "Implemented walk-forward cross-validation with embargo periods to respect temporal ordering",
      "Used Bayesian Information Criterion (BIC) to objectively select the optimal number of change-points",
      "Computed SHAP values independently per regime model so explanations reflect each market context",
      "Built a robust data preprocessing pipeline with forward-fill, calendar alignment, and outlier detection",
    ],
    lessonsLearned: [
      "Explainability is not optional in finance — it is a prerequisite for model adoption by practitioners",
      "Change-point detection fundamentally improves forecasting by acknowledging that markets evolve",
      "Walk-forward validation reveals true out-of-sample performance that k-fold cross-validation masks in time series",
      "Visualising SHAP values is as important as computing them — communication of results drives impact",
    ],
  },
  {
    id: "03",
    slug: "smart-pharmacy-management",
    year: "2024",
    category: "Web App · Healthcare",
    title: "Smart Pharmacy Management System",
    description:
      "A full-stack pharmacy management platform with a customer dashboard, order management workflow, integrated payment processing, and well-structured REST APIs for inventory and prescription handling.",
    status: "completed",
    role: "Full Stack Developer",
    duration: "3 months",
    accentColor: "#10b981",
    gradient: "from-emerald-500/20 via-transparent to-transparent",
    tech: ["Next.js", "Node.js", "MongoDB", "Express.js", "REST API"],
    githubUrl: "https://github.com/Abiram19/Project-02-Frontend",
    githubBackendUrl: "https://github.com/Abiram19/Project-02-Backend",
    liveDemoUrl: undefined,
    documentationPdf: undefined,
    videoUrl: "/projects/smart-pharmacy-management/Pharmacy management system.mp4",
    thumbnailImage: "/projects/smart-pharmacy-management/pharmacy_thumbnail.png",
    galleryImages: undefined,
    overview: {
      problem:
        "Traditional pharmacies rely on manual processes for inventory tracking, prescription verification, and order management — leading to stockouts, dispensing errors, and long customer wait times.",
      solution:
        "A full-stack pharmacy management platform with separate customer and admin interfaces. Customers browse medications, submit prescriptions, and track orders online. Admins manage inventory, verify prescriptions, and process payments through a structured dashboard.",
      impact:
        "Reduces dispensing errors through structured digital prescription workflows, eliminates manual stock counting with real-time inventory tracking, and cuts customer wait time by enabling online ordering.",
    },
    features: [
      "Customer-facing medication browsing with search and filter",
      "Online prescription upload and digital verification workflow",
      "Real-time inventory tracking with low-stock alerts",
      "Order management with status tracking (placed → verified → dispensed)",
      "Integrated payment processing with receipt generation",
      "Admin dashboard with sales analytics and reports",
      "REST API with role-based access control (customer / pharmacist / admin)",
      "MongoDB-backed flexible schema for diverse medication data",
    ],
    challenges: [
      "Designing a prescription verification workflow that prevents dispensing without pharmacist approval",
      "Managing real-time inventory consistency when multiple orders are placed simultaneously",
      "Structuring MongoDB schemas for medications with highly variable attributes (dosages, variants, etc.)",
      "Implementing secure file upload for prescription images with HIPAA-mindful handling",
    ],
    solutions: [
      "Built a multi-step order state machine where orders are locked until a pharmacist digitally approves the prescription",
      "Used MongoDB transactions to ensure inventory decrements are atomic and consistent under concurrent orders",
      "Adopted a flexible document schema with a base medication model extended by category-specific sub-schemas",
      "Stored prescription images with server-side validation, type checking, and access-controlled retrieval endpoints",
    ],
    lessonsLearned: [
      "State machines make complex workflows far more reliable and easier to reason about than ad-hoc status flags",
      "MongoDB's flexibility is a strength for variable data but requires deliberate schema discipline to avoid chaos",
      "Healthcare applications require extra rigour around data access controls from the very first line of code",
      "Designing APIs for both customer and admin roles simultaneously reveals interface inconsistencies early",
    ],
  },
  {
    id: "04",
    slug: "automobile-service-management",
    year: "2023",
    category: "Web App · Automotive",
    title: "Automobile Service Management System",
    description:
      "End-to-end service management system for auto workshops featuring online service booking, an admin dashboard, comprehensive customer management, and real-time vehicle service status tracking.",
    status: "completed",
    role: "Full Stack Developer",
    duration: "3 months",
    accentColor: "#f59e0b",
    gradient: "from-amber-500/20 via-transparent to-transparent",
    tech: ["React", "PHP", "MySQL"],
    githubUrl: "https://github.com/Abiram19/Project01-Frontend",
    githubBackendUrl: "https://github.com/Abiram19/Project01-Backend",
    liveDemoUrl: undefined,
    documentationPdf: undefined,
    videoUrl: "/projects/automobile-service-management/automobile.mp4",
    thumbnailImage: "/projects/automobile-service-management/automobile_thumbnail.png",
    galleryImages: undefined,
    overview: {
      problem:
        "Auto repair workshops manage bookings, job cards, and customer records through paper-based systems or disconnected spreadsheets — making scheduling chaotic, job status opaque, and customer communication manual.",
      solution:
        "A web-based service management system with an online booking portal for customers and a comprehensive admin dashboard for workshop staff. Service advisors can manage job cards, assign technicians, update service status, and communicate updates — all in one system.",
      impact:
        "Eliminates scheduling conflicts through digital booking with availability management, gives customers real-time visibility into their vehicle's service status, and provides workshop management with actionable reporting on throughput and revenue.",
    },
    features: [
      "Online service booking with availability calendar",
      "Customer account management with vehicle history",
      "Digital job card creation and technician assignment",
      "Real-time service status tracking (booked → in-service → ready → delivered)",
      "Admin dashboard with booking overview and workload management",
      "Service history reports by customer and vehicle",
      "Email notification triggers for booking confirmation and status updates",
      "MySQL-backed relational data model for customers, vehicles, and service records",
    ],
    challenges: [
      "Preventing double-booking when multiple customers book the same time slot simultaneously",
      "Designing the relational schema to correctly handle one customer owning multiple vehicles with independent service histories",
      "Building a responsive React frontend that communicates reliably with a PHP REST backend",
      "Implementing status transitions that are meaningful to both customers and workshop staff with different terminology",
    ],
    solutions: [
      "Used MySQL transactions with row-level locking to enforce booking slot uniqueness atomically",
      "Designed a normalised schema with separate customer, vehicle, and service record tables with proper foreign keys",
      "Built a lightweight PHP REST API layer with JSON responses consumed by React's fetch API",
      "Created a dual-view status system: internal technician states that map to simplified customer-facing labels",
    ],
    lessonsLearned: [
      "Relational databases shine for interconnected entities like customers, vehicles, and service records",
      "Concurrency issues in booking systems must be handled at the database level, not just application level",
      "React and PHP can work together cleanly when the PHP layer is treated strictly as a JSON API",
      "Domain language matters — workshops and customers use different words for the same states, requiring translation in the UI",
    ],
  },
  {
    id: "05",
    slug: "food-delivery-application",
    year: "2023",
    category: "Web App · Food Tech",
    title: "Food Delivery Application",
    description:
      "A full-featured food ordering and delivery platform with menu browsing, cart management, secure payment gateway integration, real-time order tracking, and a complete admin management panel.",
    status: "completed",
    role: "Full Stack Developer",
    duration: "3 months",
    accentColor: "#f43f5e",
    gradient: "from-rose-500/20 via-transparent to-transparent",
    tech: ["JSP", "Servlet", "MySQL", "JDBC", "Bootstrap"],
    githubUrl: "https://github.com/Abiram19/online-food-ordering-system",
    liveDemoUrl: undefined,
    documentationPdf: undefined,
    videoUrl: "/projects/food-delivery-application/food_delivery_app.mp4",
    thumbnailImage: "/projects/food-delivery-application/food_thumbnail.png",
    galleryImages: undefined,
    overview: {
      problem:
        "Local restaurants lacked a digital ordering channel, forcing customers to call in orders prone to miscommunication, while restaurant owners had no visibility into order volumes, popular items, or revenue trends.",
      solution:
        "A Java EE web application built with JSP and Servlets providing an end-to-end food ordering platform. Customers browse menus, manage carts, and pay online. Restaurant admins manage menus, track incoming orders, and view revenue analytics through a dedicated panel.",
      impact:
        "Enables restaurants to accept digital orders without third-party commissions, provides customers with a seamless online ordering experience, and gives restaurant owners data-driven insights into their business performance.",
    },
    features: [
      "Restaurant menu browsing with category filtering",
      "Shopping cart with item quantity management",
      "Secure payment gateway integration with order confirmation",
      "Real-time order status tracking (placed → preparing → out for delivery → delivered)",
      "Customer order history with reorder functionality",
      "Admin panel: menu management, order processing, delivery assignment",
      "Revenue and popular items analytics dashboard",
      "Session-based authentication with role separation (customer / admin)",
    ],
    challenges: [
      "Managing shopping cart state across multiple JSP pages without a modern frontend framework",
      "Implementing concurrent order processing without race conditions in the MySQL order table",
      "Building a responsive UI with pure Bootstrap while the backend is tightly coupled to JSP",
      "Handling payment gateway callbacks securely in a Servlet-based architecture",
    ],
    solutions: [
      "Used HTTP session objects to persist cart state server-side across the JSP page lifecycle",
      "Implemented database-level transactions with appropriate isolation levels for order insertion and inventory updates",
      "Separated presentation (JSP) from business logic (Servlet + Service classes) using MVC pattern principles",
      "Processed payment callbacks in a dedicated Servlet with request signature verification before updating order state",
    ],
    lessonsLearned: [
      "Java EE MVC with JSP and Servlets teaches foundational web architecture that modern frameworks abstract away",
      "Server-side session management is powerful but requires careful lifecycle management to avoid memory issues",
      "Separating concerns even in a monolithic stack improves testability and maintainability significantly",
      "Payment integration requires a security-first mindset — callback verification is not optional",
    ],
  },
];

/** Helper: get a project by slug. Returns undefined if not found. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Helper: get related projects (excludes current, returns up to `limit`). */
export function getRelatedProjects(currentSlug: string, limit = 3): Project[] {
  return projects.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
