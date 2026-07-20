import { MobileFocusMap, MobileFrameComposition } from "./types";

export const DEFAULT_MOBILE_COMPOSITION: MobileFrameComposition = {
  focusX: 50,
  focusY: 50,
  zoom: 1,
  textLayout: "center",
  subject: "face",
  priority: "face",
};

export const DEFAULT_DESKTOP_COMPOSITION = {
  focusX: 50,
  focusY: 50,
};

/**
 * The canonical map of mobile focal points.
 * You can export new JSON from Debug Mode and paste it here.
 * Format: [frameIndex]: { ...compositionProps }
 */
export const mobileFrameFocus: MobileFocusMap = {};
