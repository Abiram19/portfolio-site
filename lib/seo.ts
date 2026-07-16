// ─── SEO Constants ────────────────────────────────────────────────────────────
// Single source of truth for all SEO-related constants.
// Import this file wherever canonical URLs or metadata are generated —
// never hardcode the domain in individual route files.

/** Canonical production domain — used in metadataBase, JSON-LD, and alternates */
export const BASE_URL = "https://abirampathmanathan.com" as const;

/** Default OG/Twitter social preview image (1200×630) */
export const OG_IMAGE_DEFAULT = "/images/og-default.jpg" as const;

/** Site display name used in OG siteName and JSON-LD */
export const SITE_NAME = "Abiram Pathmanathan" as const;
