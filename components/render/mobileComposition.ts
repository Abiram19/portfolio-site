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
  // Text starts fading out at frame 36 (18% of 200)
  0: { focusX: 50, focusY: 35, textLayout: "center" },
  36: { focusX: 50, focusY: 35, textLayout: "center" },
  
  // Scene 2 (Building Intelligent Software, Left Text)
  // Text peaks at frame 60 (30% of 200) and starts fading out at frame 92 (46% of 200)
  // The camera will pan smoothly from frame 36 to 60
  60: { focusX: 66, focusY: 50, textLayout: "left" },
  92: { focusX: 66, focusY: 50, textLayout: "left" },
  
  // Scene 3 (From Research, Right Text)
  // Text peaks at frame 120 (60% of 200) and starts fading out at frame 152 (76% of 200)
  // The camera will pan smoothly from frame 92 to 120
  120: { focusX: 34, focusY: 50, textLayout: "right" },
  152: { focusX: 34, focusY: 50, textLayout: "right" },
  
  // Scene 4 (Extraordinary, Center Text)
  // Text peaks at frame 176 (88% of 200)
  // The camera will pan smoothly from frame 152 to 176
  176: { focusX: 50, focusY: 40, textLayout: "center" },
  199: { focusX: 50, focusY: 40, textLayout: "center" },
};
