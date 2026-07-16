import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Image optimization ───────────────────────────────────────────────────────
  // `unoptimized: true` was previously set globally, which disabled Next.js
  // image optimization for every image on the site. This is incorrect.
  //
  // The sequence frames in /public/sequence/ are served via bare <img> tags,
  // NOT via next/image — so they are completely unaffected by this setting.
  //
  // `next/image` is not used anywhere in this codebase (confirmed by audit).
  // Removing this option restores full optimization capability so that any
  // future use of <Image> from next/image gets automatic:
  //   - WebP / AVIF conversion
  //   - Responsive srcSet generation
  //   - Lazy loading
  //   - CLS prevention via reserved layout space
  //   - CDN-friendly caching headers
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [25, 50, 75, 80, 85, 90, 95, 100],
    minimumCacheTTL: 31536000,
  },

  async headers() {
    return [
      {
        source: "/sequence/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/projects/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/certifications/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // ── Package import optimization ──────────────────────────────────────────────
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
