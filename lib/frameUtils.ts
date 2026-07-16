/**
 * Generates the filename for a given frame index.
 * Files are named like: frame_000_delay-0.05s.webp
 */
export function getFrameUrl(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/sequence/frame_${padded}_delay-0.05s.webp`;
}

export const TOTAL_FRAMES = 200;

/**
 * Returns an array of all frame URLs
 */
export function getAllFrameUrls(): string[] {
  return Array.from({ length: TOTAL_FRAMES }, (_, i) => getFrameUrl(i));
}
