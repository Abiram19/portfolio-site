import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { certifications, getCertificationBySlug } from "@/lib/data/certifications";
import CertificationDetailClient from "@/app/certifications/[slug]/CertificationDetailClient";
import { BASE_URL } from "@/lib/seo";
import { getCertificationJsonLd } from "@/lib/schema";

// ── Static generation ─────────────────────────────────────────────────────────
export function generateStaticParams() {
  return certifications.map((c) => ({ slug: c.slug }));
}

// ── Per-page SEO metadata ─────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cert = getCertificationBySlug(slug);
  if (!cert) return { title: "Certification Not Found" };

  const title = `${cert.title} — Abiram Pathmanathan`;
  const description =
    cert.description ??
    `${cert.title} certification issued by ${cert.issuer}. Category: ${cert.category}.`;
  const image = cert.certificateImage ?? "/images/og-default.jpg";

  return {
    title,
    description,
    keywords: [
      cert.title,
      cert.issuer,
      cert.category,
      ...(cert.skills ?? []),
      "Abiram Pathmanathan",
      "certification",
      "credential",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: `${cert.title} — Abiram Pathmanathan` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: `${cert.title} — Abiram Pathmanathan` }],
    },
    alternates: {
      canonical: `${BASE_URL}/certifications/${cert.slug}`,
    },
  };
}

// ── Page (Server Component) ───────────────────────────────────────────────────
export default async function CertificationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cert = getCertificationBySlug(slug);
  if (!cert) notFound();

  const schemas = getCertificationJsonLd(cert);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <CertificationDetailClient cert={cert} />
    </>
  );
}
