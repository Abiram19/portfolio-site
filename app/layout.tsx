import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { BASE_URL, OG_IMAGE_DEFAULT, SITE_NAME } from "@/lib/seo";

// ── Font ───────────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// ── Viewport (theme-color lives here in Next.js 14+) ──────────────────────────
export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  width: "device-width",
  initialScale: 1,
};

// ── Root Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // ── Foundation ──────────────────────────────────────────────────────────────
  metadataBase: new URL(BASE_URL),

  applicationName: SITE_NAME,

  title: {
    // Used on the homepage directly
    default: "Abiram Pathmanathan — Software Engineer & AI Developer",
    // Applied to all sub-pages: "<PageTitle> | Abiram Pathmanathan"
    template: "%s | Abiram Pathmanathan",
  },

  description:
    "Full Stack Software Engineer specializing in AI-powered applications, scalable web platforms, enterprise software, and machine learning solutions. Available for Software Engineering roles and custom software development.",

  // ── Authorship & Publisher ──────────────────────────────────────────────────
  authors: [{ name: "Abiram Pathmanathan", url: BASE_URL }],
  creator: "Abiram Pathmanathan",
  publisher: "Abiram Pathmanathan",

  // ── Classification ──────────────────────────────────────────────────────────
  category: "technology",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  // ── Format detection (prevents unwanted auto-linking on mobile) ─────────────
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // ── Crawling & indexing directives ──────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Canonical URL (homepage) ─────────────────────────────────────────────────
  // metadataBase resolves this to: https://abirampathmanathan.com
  alternates: {
    canonical: "/",
  },

  // ── Keywords (high-intent, recruiter & client focused) ──────────────────────
  keywords: [
    // Identity
    "Abiram Pathmanathan",
    "Abiram Pathmanathan Portfolio",
    // Role-specific (recruiter intent)
    "Software Engineer",
    "Full Stack Software Engineer",
    "Full Stack Developer",
    "Full Stack Web Developer",
    "AI Engineer",
    "AI Application Developer",
    "Machine Learning Engineer",
    "ML Researcher",
    "Backend Engineer",
    "Frontend Engineer",
    // Technology (high-specificity)
    "React Developer",
    "Next.js Developer",
    "Angular Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "ASP.NET Core Developer",
    "NestJS Developer",
    "Python Developer",
    // Service-specific (client intent)
    "Custom Software Development",
    "Enterprise Web Application Development",
    "SaaS Development",
    "REST API Development",
    "AI-Powered Application Development",
    "Freelance Software Developer",
    "Remote Software Engineer",
    // Location
    "Software Engineer Sri Lanka",
    "Full Stack Developer Sri Lanka",
    "Uva Wellassa University",
  ],

  // ── Open Graph ───────────────────────────────────────────────────────────────
  openGraph: {
    title: "Abiram Pathmanathan — Software Engineer & AI Developer",
    description:
      "Full Stack Software Engineer specializing in AI-powered applications, scalable web platforms, enterprise software, and machine learning solutions.",
    url: BASE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: OG_IMAGE_DEFAULT,
        width: 1200,
        height: 630,
        alt: "Abiram Pathmanathan — Software Engineer & AI Developer",
        type: "image/jpeg",
      },
    ],
  },

  // ── Twitter / X Card ─────────────────────────────────────────────────────────
  // No @creator handle — account does not exist.
  // summary_large_image still renders correctly without a creator.
  twitter: {
    card: "summary_large_image",
    title: "Abiram Pathmanathan — Software Engineer & AI Developer",
    description:
      "Full Stack Software Engineer specializing in AI-powered applications, scalable web platforms, enterprise software, and machine learning solutions.",
    images: [
      {
        url: OG_IMAGE_DEFAULT,
        width: 1200,
        height: 630,
        alt: "Abiram Pathmanathan — Software Engineer & AI Developer",
      },
    ],
  },
};

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link
          rel="preload"
          href="/sequence/frame_000_delay-0.05s.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className="bg-[#0d0d0d] text-white overflow-x-hidden antialiased">
        {children}
        <GoogleAnalytics gaId="G-LT5XVDQ8KZ" />
      </body>
    </html>
  );
}
