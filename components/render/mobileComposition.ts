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
  0: { focusX: 50, focusY: 35, textLayout: "center" },
  43: { focusX: 50, focusY: 35, textLayout: "center" },
  
  // Scene 2 (Building Intelligent Software, Left Text)
  44: { focusX: 66, focusY: 50, textLayout: "left" },
  99: { focusX: 66, focusY: 50, textLayout: "left" },
  
  // Scene 3 (From Research, Right Text)
  100: { focusX: 34, focusY: 50, textLayout: "right" },
  159: { focusX: 34, focusY: 50, textLayout: "right" },
  
  // Scene 4 (Extraordinary, Center Text)
  160: { focusX: 50, focusY: 40, textLayout: "center" },
  199: { focusX: 50, focusY: 40, textLayout: "center" },
};
