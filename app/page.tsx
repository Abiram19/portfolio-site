import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import { projects } from "@/lib/data/projects";
import { certifications } from "@/lib/data/certifications";
import { featuredResearch } from "@/lib/data/research";
import {
  getPersonJsonLd,
  getOrganizationJsonLd,
  getWebSiteJsonLd,
  getProfileAndWebPageJsonLd,
  getContactPointJsonLd,
  getCollectionPagesJsonLd,
  getHomepageItemListJsonLd,
  getHomepageFaqJsonLd,
  getResearchJsonLd,
} from "@/lib/schema";

const About = dynamic(() => import("@/components/About"));
const Projects = dynamic(() => import("@/components/Projects"));
const Skills = dynamic(() => import("@/components/Skills"));
const Research = dynamic(() => import("@/components/Research"));
const Certifications = dynamic(() => import("@/components/Certifications"));
const Timeline = dynamic(() => import("@/components/Timeline"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function Home() {
  const schemas = [
    getPersonJsonLd(),
    getOrganizationJsonLd(),
    getWebSiteJsonLd(),
    getProfileAndWebPageJsonLd(),
    getContactPointJsonLd(),
    ...getCollectionPagesJsonLd(),
    ...getHomepageItemListJsonLd(projects, certifications),
    getHomepageFaqJsonLd(),
    ...getResearchJsonLd(featuredResearch),
  ];

  return (
    <PageWrapper>
      {/* ── Consolidated Structured Data for AI & Search Engines ───────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <main id="main-content" className="relative bg-[#0d0d0d]">
        {/* Single Semantic H1 for Homepage SEO & Screen Readers */}
        <h1 className="sr-only">
          Abiram Pathmanathan — Full Stack Software Engineer Building AI-Powered Software
        </h1>

        {/* Fixed navigation */}
        <Navbar />

        {/* ─── SCROLLYTELLING HERO ────────────────────────────────────────
          ScrollyCanvas creates 500vh of scroll space.
          Overlay renders on top with negative margin-top (-500vh)
          so they share the same scroll container.
        ─────────────────────────────────────────────────────────────── */}
        <div className="relative">
          <ScrollyCanvas />
          <Overlay />
        </div>

        {/* ─── BELOW-FOLD SECTIONS ──────────────────────────────────── */}
        <div className="relative z-10 bg-[#0d0d0d]">
          {/* Divider glow */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(168,255,120,0.2), transparent)",
            }}
          />

          <About />

          {/* Chapter-break spacer: About → Projects */}
          <div className="h-[80px] md:h-[120px] lg:h-[160px]" />

          <Projects />

          <div className="h-16 md:h-24 lg:h-32" />

          <Skills />

          <div className="h-16 md:h-24 lg:h-32" />

          <Research />

          <div className="h-16 md:h-24 lg:h-32" />

          <Certifications />

          <div className="h-16 md:h-24 lg:h-32" />

          <Timeline />

          <div className="h-16 md:h-24 lg:h-32" />

          <Contact />

          <Footer />
        </div>
      </main>
    </PageWrapper>
  );
}
