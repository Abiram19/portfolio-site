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
export const mobileFrameFocus: MobileFocusMap = {
  // Scene 1 (Intro, Center Text)
  0: { focusX: 50, focusY: 50, textLayout: "center" },
  36: { focusX: 50, focusY: 50, textLayout: "center" },
  
  // Scene 2 (Building Intelligent Software, Left Text)
  60: { focusX: 50, focusY: 50, textLayout: "left" },
  92: { focusX: 50, focusY: 50, textLayout: "left" },
  
  // Scene 3 (From Research, Right Text)
  120: { focusX: 50, focusY: 50, textLayout: "right" },
  152: { focusX: 50, focusY: 50, textLayout: "right" },
  
  // Scene 4 (Extraordinary, Center Text)
  176: { focusX: 50, focusY: 50, textLayout: "center" },
  199: { focusX: 50, focusY: 50, textLayout: "center" },
};
