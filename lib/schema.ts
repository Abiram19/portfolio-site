// ─── Schema.org & JSON-LD Utilities ──────────────────────────────────────────
// Consolidated, machine-readable structured data builders for Google, Bing,
// ChatGPT, Gemini, Claude, and Perplexity AI search engines.
// Zero schema duplication across Person, Organization, and WebSite entities.

import { BASE_URL, OG_IMAGE_DEFAULT, SITE_NAME } from "@/lib/seo";
import type { Project } from "@/lib/data/projects";
import type { Certification } from "@/lib/data/certifications";
import type { ResearchPaper } from "@/lib/data/research";

/**
 * Primary Person entity (#person). Single source of truth across all pages.
 * Establishes Google Knowledge Panel eligibility, top-level skills, and identity.
 */
export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
    name: "Abiram Pathmanathan",
    url: BASE_URL,
    image: {
      "@type": "ImageObject",
      "@id": `${BASE_URL}/#author-image`,
      url: `${BASE_URL}${OG_IMAGE_DEFAULT}`,
      caption: "Abiram Pathmanathan — Full Stack Software Engineer",
    },
    jobTitle: "Software Engineer & AI Developer",
    description:
      "Full Stack Software Engineer specializing in AI-powered applications, scalable web platforms, enterprise software, and machine learning solutions.",
    email: "abiram0619@gmail.com",
    hasOccupation: {
      "@type": "Occupation",
      name: "Software Engineer",
      occupationLocation: {
        "@type": "AdministrativeArea",
        name: "Worldwide / Remote",
      },
      skills:
        "Full Stack Development, Artificial Intelligence, Machine Learning, Next.js, React, TypeScript, Python, Cloud Architecture",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Uva Wellassa University of Sri Lanka",
      url: "https://www.uwu.ac.lk/",
    },
    worksFor: {
      "@type": "Organization",
      name: "Abiram Pathmanathan Software & AI Solutions",
      "@id": `${BASE_URL}/#organization`,
    },
    knowsAbout: [
      "React",
      "Next.js",
      "Angular",
      "ASP.NET Core",
      "NestJS",
      "Node.js",
      "Express.js",
      "TypeScript",
      "JavaScript",
      "MongoDB",
      "PostgreSQL",
      "SQL Server",
      "Python",
      "Machine Learning",
      "Explainable AI",
      "REST APIs",
      "Cloud Architecture",
      "Azure DevOps",
      "Docker",
      "Git",
      "GitHub",
      "Tailwind CSS",
      "Framer Motion",
      "Full Stack Development",
      "Software Engineering",
      "Artificial Intelligence",
    ],
    sameAs: [
      "https://github.com/Abiram19",
      "https://linkedin.com/in/abiram-pathmanathan-a44ba5268",
    ],
  };
}

/**
 * Organization entity (#organization) representing personal brand & consulting services.
 */
export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Abiram Pathmanathan Software & AI Solutions",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}${OG_IMAGE_DEFAULT}`,
    },
    description:
      "Partnering with startups, businesses, and entrepreneurs to build modern, scalable, and production-ready software solutions.",
    founder: {
      "@id": `${BASE_URL}/#person`,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "abiram0619@gmail.com",
      contactType: "software development services",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Tamil", "Sinhala"],
    },
  };
}

/**
 * WebSite entity (#website) with SearchAction entry point.
 */
export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: SITE_NAME,
    description:
      "Personal portfolio of Abiram Pathmanathan — Full Stack Software Engineer & AI Developer.",
    publisher: {
      "@id": `${BASE_URL}/#person`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-US",
  };
}

/**
 * ProfilePage and WebPage composite entity (#webpage) with SpeakableSpecification.
 */
export function getProfileAndWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfilePage", "WebPage"],
    "@id": `${BASE_URL}/#webpage`,
    url: BASE_URL,
    name: "Abiram Pathmanathan — Full Stack Software Engineer & AI Developer",
    description:
      "Actively seeking Software Engineering opportunities while partnering with startups, businesses, and entrepreneurs to build modern, scalable, and production-ready software solutions.",
    mainEntity: {
      "@id": `${BASE_URL}/#person`,
    },
    about: {
      "@id": `${BASE_URL}/#person`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#main-content h1", "#about-heading", "#about p"],
    },
    isPartOf: {
      "@id": `${BASE_URL}/#website`,
    },
  };
}

/**
 * ContactPoint entity and ContactPage markup (#contactpage).
 */
export function getContactPointJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${BASE_URL}/#contactpage`,
    url: `${BASE_URL}/#contact`,
    name: "Contact Abiram Pathmanathan",
    description:
      "Get in touch for software engineering roles, custom software development, AI applications, and consulting.",
    mainEntity: {
      "@type": "ContactPoint",
      email: "abiram0619@gmail.com",
      contactType: "customer service",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Tamil", "Sinhala"],
    },
  };
}

/**
 * CollectionPage schemas for Projects, Certifications, and Research sections.
 */
export function getCollectionPagesJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${BASE_URL}/#projects-collection`,
      url: `${BASE_URL}/#projects`,
      name: "Featured Software & AI Projects Collection",
      description:
        "Comprehensive collection of enterprise web applications, custom business software, and AI-powered platforms built by Abiram Pathmanathan.",
      about: { "@id": `${BASE_URL}/#person` },
      isPartOf: { "@id": `${BASE_URL}/#website` },
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${BASE_URL}/#certifications-collection`,
      url: `${BASE_URL}/#certifications`,
      name: "Professional Certifications & Credentials Collection",
      description:
        "Curated collection of industry-recognized certifications in Machine Learning, Python, and AI from Stanford, DeepLearning.AI, and Uva Wellassa University.",
      about: { "@id": `${BASE_URL}/#person` },
      isPartOf: { "@id": `${BASE_URL}/#website` },
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${BASE_URL}/#research-collection`,
      url: `${BASE_URL}/#research`,
      name: "Academic Research & Innovation Collection",
      description:
        "Scholarly articles and research investigations by Abiram Pathmanathan in Explainable AI and financial time series analysis.",
      about: { "@id": `${BASE_URL}/#person` },
      isPartOf: { "@id": `${BASE_URL}/#website` },
    },
  ];
}

/**
 * ItemList structured data for Projects and Certifications on the homepage.
 */
export function getHomepageItemListJsonLd(
  projectsList: Project[],
  certificationsList: Certification[]
) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${BASE_URL}/#projects-list`,
      name: "Featured Software & AI Projects by Abiram Pathmanathan",
      description:
        "Production-ready enterprise web applications, AI/ML solutions, and custom business software.",
      itemListElement: projectsList.map((p, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: p.title,
        url: `${BASE_URL}/projects/${p.slug}`,
        description: p.description,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${BASE_URL}/#certifications-list`,
      name: "Professional Certifications & Credentials",
      description:
        "AI, Machine Learning, Python, and Software Architecture certifications from DeepLearning.AI, Stanford, and Uva Wellassa University.",
      itemListElement: certificationsList.map((c, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: c.title,
        url: `${BASE_URL}/certifications/${c.slug}`,
        description: `${c.issuer} — ${c.issuedDate || c.category}`,
      })),
    },
  ];
}

/**
 * FAQPage schema for recruiter/AI search engine clarity.
 */
export function getHomepageFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE_URL}/#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "What professional roles is Abiram Pathmanathan open to?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Abiram Pathmanathan is actively open to full-time and contract Software Engineering roles, Custom Software Development partnerships, and Full-Stack or AI application engineering opportunities worldwide.",
        },
      },
      {
        "@type": "Question",
        name: "What is Abiram Pathmanathan's core technology stack?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "His core technology stack includes React, Next.js, TypeScript, Node.js, ASP.NET Core, Python, Machine Learning (XGBoost, SHAP), PostgreSQL, MongoDB, SQL Server, and Cloud Architecture (Docker, Azure DevOps).",
        },
      },
      {
        "@type": "Question",
        name: "What types of software solutions does Abiram Pathmanathan build?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Abiram designs and builds Enterprise Web Applications, Custom Business Software, AI-Powered Applications, SaaS Platforms, REST APIs, Admin Dashboards, and Machine Learning systems.",
        },
      },
    ],
  };
}

/**
 * ScholarlyArticle, ResearchProject, and CreativeWork markup for the research section.
 */
export function getResearchJsonLd(paper: ResearchPaper) {
  const fullTitle = `${paper.titleParts.prefix}${paper.titleParts.accent}${paper.titleParts.suffix}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      "@id": `${BASE_URL}/#scholarly-article`,
      headline: fullTitle,
      name: fullTitle,
      abstract: paper.abstract,
      author: {
        "@id": `${BASE_URL}/#person`,
      },
      keywords: [
        "Machine Learning",
        "Explainable AI",
        "Stock Market Prediction",
        "Cross-country Analysis",
        "XGBoost",
        "SHAP",
        "Ruptures",
        "Volatility Regimes",
        ...paper.tags,
      ].join(", "),
      about: [
        { "@type": "DefinedTerm", name: "Machine Learning" },
        { "@type": "DefinedTerm", name: "Explainable AI" },
        { "@type": "DefinedTerm", name: "Stock Market Prediction" },
        { "@type": "DefinedTerm", name: "Cross-country Analysis" },
      ],
      datePublished: "2025-01-01",
      publisher: {
        "@id": `${BASE_URL}/#person`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ResearchProject",
      "@id": `${BASE_URL}/#research-project`,
      name: fullTitle,
      description: paper.abstract,
      investigator: {
        "@id": `${BASE_URL}/#person`,
      },
      keywords: "Machine Learning, Explainable AI, Financial Volatility, Time Series Analysis",
    },
  ];
}

/**
 * Full SoftwareApplication + BreadcrumbList + ImageObject for individual project detail pages.
 */
export function getSoftwareApplicationJsonLd(project: Project) {
  const projectUrl = `${BASE_URL}/projects/${project.slug}`;
  const imageUrl = project.thumbnailImage
    ? `${BASE_URL}${project.thumbnailImage}`
    : `${BASE_URL}${OG_IMAGE_DEFAULT}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${BASE_URL}/#projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: projectUrl,
      },
    ],
  };

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${projectUrl}#application`,
    name: project.title,
    description: project.overview?.solution ?? project.description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: project.category,
    operatingSystem: "All, Web, Windows, macOS, Linux",
    programmingLanguage: project.tech,
    keywords: [...project.tech, project.title, project.category].join(", "),
    featureList: project.features ?? project.solutions ?? [],
    screenshot: {
      "@type": "ImageObject",
      url: imageUrl,
      caption: `${project.title} interface and software architecture`,
    },
    author: {
      "@id": `${BASE_URL}/#person`,
    },
    creator: {
      "@id": `${BASE_URL}/#person`,
    },
    dateCreated: project.year ? `${project.year}-01-01` : undefined,
    dateModified: new Date().toISOString().split("T")[0],
    ...(project.githubUrl && { codeRepository: project.githubUrl }),
    url: project.liveDemoUrl ?? projectUrl,
    ...(project.githubUrl && {
      offers: {
        "@type": "Offer",
        price: "0.00",
        priceCurrency: "USD",
        description: "Open Source Software",
      },
    }),
  };

  const imageObject = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${projectUrl}#image`,
    url: imageUrl,
    caption: `${project.title} software architecture and application preview`,
    creator: {
      "@id": `${BASE_URL}/#person`,
    },
    copyrightNotice: "Abiram Pathmanathan",
    representativeOfPage: true,
  };

  return [breadcrumb, softwareApp, imageObject];
}

/**
 * Full EducationalOccupationalCredential + Course + BreadcrumbList + ImageObject for certification detail pages.
 */
export function getCertificationJsonLd(cert: Certification) {
  const certUrl = `${BASE_URL}/certifications/${cert.slug}`;
  const imageUrl = cert.certificateImage
    ? `${BASE_URL}${cert.certificateImage}`
    : `${BASE_URL}${OG_IMAGE_DEFAULT}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Certifications",
        item: `${BASE_URL}/#certifications`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cert.title,
        item: certUrl,
      },
    ],
  };

  const credential = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    "@id": `${certUrl}#credential`,
    name: cert.title,
    description: cert.description ?? `${cert.title} issued by ${cert.issuer}`,
    credentialCategory: "Certificate",
    recognizedBy: {
      "@type": "Organization",
      name: cert.issuer,
      ...(cert.issuerUrl && { url: cert.issuerUrl }),
    },
    competencyRequired: cert.skills ?? [],
    educationalLevel: "Professional Development",
    url: cert.verificationUrl ?? certUrl,
    image: imageUrl,
    ...(cert.issuedDate && { dateCreated: cert.issuedDate }),
    ...(cert.credentialId && { identifier: cert.credentialId }),
    about: (cert.skills ?? []).map((skill) => ({
      "@type": "DefinedTerm",
      name: skill,
    })),
  };

  const course = {
    "@context": "https://schema.org",
    "@type": ["Course", "LearningResource"],
    "@id": `${certUrl}#course`,
    name: cert.title,
    description: cert.description ?? cert.summary ?? `${cert.title} training course`,
    provider: {
      "@type": "Organization",
      name: cert.issuer,
      ...(cert.issuerUrl && { url: cert.issuerUrl }),
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      instructor: {
        "@type": "Organization",
        name: cert.issuer,
      },
    },
  };

  const imageObject = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${certUrl}#image`,
    url: imageUrl,
    caption: `${cert.title} certificate issued by ${cert.issuer}`,
    creator: {
      "@type": "Organization",
      name: cert.issuer,
    },
    copyrightNotice: cert.issuer,
    representativeOfPage: true,
  };

  return [breadcrumb, credential, course, imageObject];
}
