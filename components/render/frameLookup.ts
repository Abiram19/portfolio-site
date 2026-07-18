import { TOTAL_FRAMES } from "@/lib/frameUtils";
import { interpolateMobileFocusMap } from "./interpolation";
import { mobileFrameFocus, DEFAULT_MOBILE_COMPOSITION, DEFAULT_DESKTOP_COMPOSITION } from "./mobileComposition";
import { ResolvedFrameFocalPoint } from "./types";

/**
 * Precomputes the entire 200-frame interpolation map on module load.
 * This guarantees O(1) lookup inside requestAnimationFrame, with 
 * zero runtime allocations, zero calculations, and maximum performance.
 */
const interpolatedMobileMap = interpolateMobileFocusMap(
  TOTAL_FRAMES,
  mobileFrameFocus,
  DEFAULT_MOBILE_COMPOSITION
);

export const PRECOMPUTED_FRAME_LOOKUP: ResolvedFrameFocalPoint[] = interpolatedMobileMap.map((mobileComp) => ({
  desktop: {
    x: DEFAULT_DESKTOP_COMPOSITION.focusX / 100,
    y: DEFAULT_DESKTOP_COMPOSITION.focusY / 100,
  },
  mobile: {
    x: mobileComp.focusX / 100,
    y: mobileComp.focusY / 100,
  }
}));

/**
 * Returns the exact mathematical focal point for any given frame.
 * @param frameIndex The current integer frame index
 */
export function getFrameFocalPoint(frameIndex: number): ResolvedFrameFocalPoint {
  // Safe bounded access
  const safeIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(frameIndex)));
  return PRECOMPUTED_FRAME_LOOKUP[safeIndex];
}
