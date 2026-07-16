import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProjectBySlug, getRelatedProjects } from "@/lib/data/projects";
import ProjectDetailClient from "@/app/projects/[slug]/ProjectDetailClient";
import { BASE_URL } from "@/lib/seo";
import { getSoftwareApplicationJsonLd } from "@/lib/schema";

// ── Static generation ─────────────────────────────────────────────────────────
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// ── Per-page SEO metadata ─────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  const title = `${project.title} — Abiram Pathmanathan`;
  const description = project.overview?.solution ?? project.description;
  const image = project.thumbnailImage ?? "/images/og-default.jpg";

  return {
    title,
    description,
    keywords: [
      project.title,
      ...project.tech,
      project.category,
      "Abiram Pathmanathan",
      "portfolio",
      "project",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: `${project.title} — Abiram Pathmanathan` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: `${project.title} — Abiram Pathmanathan` }],
    },
    alternates: {
      canonical: `${BASE_URL}/projects/${project.slug}`,
    },
  };
}

// ── Page (Server Component) ───────────────────────────────────────────────────
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(slug, 3);
  const schemas = getSoftwareApplicationJsonLd(project);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <ProjectDetailClient project={project} related={related} />
    </>
  );
}
