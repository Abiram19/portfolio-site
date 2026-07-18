/**
 * types.ts
 *
 * Core interfaces for the Mobile Cinematic Composition Engine.
 * Designed for mathematical correctness, future-proofing, and AAA-grade rendering.
 */

export interface MobileFrameComposition {
  /** X-coordinate focal point (0-100) */
  focusX: number;
  /** Y-coordinate focal point (0-100) */
  focusY: number;
  /** Zoom multiplier for cinematic scaling (default: 1) */
  zoom: number;
  /** Expected layout of overlay text */
  textLayout: "left" | "center" | "right";
  /** What the subject of the frame is (used for semantic safe-zoning) */
  subject: "face" | "portrait" | "eyes" | "brain" | "world";
  /** Rendering priority for interpolation and safe-zoning */
  priority: "eyes" | "face" | "text";
}

export interface DesktopFrameComposition {
  focusX: number;
  focusY: number;
}

export interface ResolvedFrameFocalPoint {
  desktop: {
    x: number;
    y: number;
  };
  mobile: {
    x: number;
    y: number;
  };
}

export type MobileFocusMap = Record<number, Partial<MobileFrameComposition>>;
