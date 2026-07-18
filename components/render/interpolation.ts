import { MobileFrameComposition, MobileFocusMap } from "./types";

/**
 * Linear interpolation between two values.
 */
function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Interpolates missing frames in a MobileFocusMap.
 * Mathematically stable and deterministic.
 */
export function interpolateMobileFocusMap(
  totalFrames: number,
  keyframeMap: MobileFocusMap,
  defaultComposition: MobileFrameComposition
): MobileFrameComposition[] {
  const result: MobileFrameComposition[] = new Array(totalFrames);
  
  // Extract defined keyframe indices and sort them
  const keyIndices = Object.keys(keyframeMap)
    .map(Number)
    .sort((a, b) => a - b);

  if (keyIndices.length === 0) {
    // If no keyframes provided, return default composition for all frames
    for (let i = 0; i < totalFrames; i++) {
      result[i] = { ...defaultComposition };
    }
    return result;
  }

  for (let i = 0; i < totalFrames; i++) {
    // Exact match
    if (keyframeMap[i] !== undefined) {
      result[i] = { ...defaultComposition, ...keyframeMap[i] };
      continue;
    }

    // Find nearest neighbors
    let prevIndex = -1;
    let nextIndex = -1;

    for (const k of keyIndices) {
      if (k < i) prevIndex = k;
      if (k > i && nextIndex === -1) {
        nextIndex = k;
        break;
      }
    }

    // Edge Cases: before first keyframe or after last keyframe
    if (prevIndex === -1) {
      result[i] = { ...defaultComposition, ...keyframeMap[nextIndex] };
    } else if (nextIndex === -1) {
      result[i] = { ...defaultComposition, ...keyframeMap[prevIndex] };
    } else {
      // Interpolate between prevIndex and nextIndex
      const prevComp = { ...defaultComposition, ...keyframeMap[prevIndex] };
      const nextComp = { ...defaultComposition, ...keyframeMap[nextIndex] };
      
      const t = (i - prevIndex) / (nextIndex - prevIndex);

      result[i] = {
        focusX: lerp(prevComp.focusX, nextComp.focusX, t),
        focusY: lerp(prevComp.focusY, nextComp.focusY, t),
        zoom: lerp(prevComp.zoom, nextComp.zoom, t),
        // Discrete properties take the value of the previous keyframe
        textLayout: prevComp.textLayout,
        subject: prevComp.subject,
        priority: prevComp.priority,
      };
    }
  }

  return result;
}
