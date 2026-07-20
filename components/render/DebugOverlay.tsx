"use client";

import { useEffect, useState, useCallback } from "react";
import { mobileFrameFocus, DEFAULT_MOBILE_COMPOSITION } from "./mobileComposition";
import { TOTAL_FRAMES } from "@/lib/frameUtils";
import { interpolateMobileFocusMap } from "./interpolation";
import { MobileFocusMap, ResolvedFrameFocalPoint } from "./types";

interface DebugOverlayProps {
  getCurrentFrame: () => number;
  overrideFrame: (frame: number | null) => void;
  onFocalPointUpdate: (frame: number, x: number, y: number) => void;
  getMetrics: () => { canvasW: number; canvasH: number; drawW: number; drawH: number };
}

export default function DebugOverlay({
  getCurrentFrame,
  overrideFrame,
  onFocalPointUpdate,
  getMetrics,
}: DebugOverlayProps) {
  const [editedMap, setEditedMap] = useState<MobileFocusMap>({ ...mobileFrameFocus });
  const [manualFrame, setManualFrame] = useState<number | null>(null);
  const [previewInterpolation, setPreviewInterpolation] = useState(false);
  const [polledFrame, setPolledFrame] = useState(0);

  // Poll for scroll frame updates without forcing parent to rerender
  useEffect(() => {
    let active = true;
    const loop = () => {
      if (!active) return;
      const f = getCurrentFrame();
      setPolledFrame(prev => (prev !== f ? f : prev));
      requestAnimationFrame(loop);
    };
    const id = requestAnimationFrame(loop);
    return () => {
      active = false;
      cancelAnimationFrame(id);
    };
  }, [getCurrentFrame]);

  // Recompute interpolation when map or preview changes
  const interpolatedMap = previewInterpolation 
    ? interpolateMobileFocusMap(TOTAL_FRAMES, editedMap, DEFAULT_MOBILE_COMPOSITION)
    : null;

  // The active frame to display
  const displayFrame = manualFrame !== null ? manualFrame : polledFrame;
  const currentComp = editedMap[displayFrame] || DEFAULT_MOBILE_COMPOSITION;

  const actualX = previewInterpolation && interpolatedMap 
    ? (interpolatedMap[displayFrame]?.focusX ?? DEFAULT_MOBILE_COMPOSITION.focusX) 
    : (currentComp.focusX ?? DEFAULT_MOBILE_COMPOSITION.focusX);
    
  const actualY = previewInterpolation && interpolatedMap 
    ? (interpolatedMap[displayFrame]?.focusY ?? DEFAULT_MOBILE_COMPOSITION.focusY) 
    : (currentComp.focusY ?? DEFAULT_MOBILE_COMPOSITION.focusY);

  // Notify parent (ScrollyCanvas) to use this specific focal point when debugging
  useEffect(() => {
    onFocalPointUpdate(displayFrame, actualX, actualY);
  }, [displayFrame, actualX, actualY, onFocalPointUpdate]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (process.env.NODE_ENV !== "development") return;
    const activeTagName = document.activeElement?.tagName;
    if (activeTagName === "INPUT" || activeTagName === "TEXTAREA") return;

    if (e.key === "PageUp") {
      e.preventDefault();
      setManualFrame(prev => Math.max(0, (prev !== null ? prev : polledFrame) - 1));
      overrideFrame(Math.max(0, (manualFrame !== null ? manualFrame : polledFrame) - 1));
    } else if (e.key === "PageDown") {
      e.preventDefault();
      setManualFrame(prev => Math.min(TOTAL_FRAMES - 1, (prev !== null ? prev : polledFrame) + 1));
      overrideFrame(Math.min(TOTAL_FRAMES - 1, (manualFrame !== null ? manualFrame : polledFrame) + 1));
    } else if (e.key === "Escape") {
      setManualFrame(null);
      overrideFrame(null);
    } else if (e.key === " ") {
      e.preventDefault();
      setPreviewInterpolation(p => !p);
    } else if (e.key === "r" || e.key === "R") {
      // Reset current frame to canonical
      setEditedMap(prev => {
        const next = { ...prev };
        if (mobileFrameFocus[displayFrame]) {
          next[displayFrame] = { ...mobileFrameFocus[displayFrame] };
        } else {
          delete next[displayFrame];
        }
        return next;
      });
    } else if (e.key === "c" || e.key === "C") {
      // Copy current frame values
      navigator.clipboard.writeText(JSON.stringify(editedMap[displayFrame] || DEFAULT_MOBILE_COMPOSITION));
    } else if (e.key === "s" || e.key === "S") {
      // Export JSON
      const json = JSON.stringify(editedMap, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mobile-focus-map.json";
      a.click();
      URL.revokeObjectURL(url);
    } else if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
      const step = e.shiftKey ? 5 : 1;
      
      setEditedMap(prev => {
        const next = { ...prev };
        const existing = next[displayFrame] || { ...DEFAULT_MOBILE_COMPOSITION };
        
        let newX = existing.focusX ?? DEFAULT_MOBILE_COMPOSITION.focusX;
        let newY = existing.focusY ?? DEFAULT_MOBILE_COMPOSITION.focusY;
        
        if (e.key === "ArrowLeft") newX = Math.max(0, newX - step);
        if (e.key === "ArrowRight") newX = Math.min(100, newX + step);
        if (e.key === "ArrowUp") newY = Math.max(0, newY - step);
        if (e.key === "ArrowDown") newY = Math.min(100, newY + step);
        
        next[displayFrame] = { ...existing, focusX: newX, focusY: newY };
        return next;
      });
    }
  }, [polledFrame, displayFrame, manualFrame, overrideFrame, editedMap]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (process.env.NODE_ENV !== "development") return null;

  // Calculate visual bounds for debugging overlay
  const { canvasW, canvasH, drawW, drawH } = getMetrics();
  const drawX = (canvasW - drawW) * (actualX / 100);
  const drawY = (canvasH - drawH) * (actualY / 100);

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {/* HUD Panel */}
      <div className="absolute top-4 left-4 bg-black/80 text-green-400 font-mono text-xs p-4 rounded border border-green-500/30 backdrop-blur-sm pointer-events-auto shadow-2xl">
        <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-[10px]">Cinematic Render Debug</h3>
        <table className="w-full text-left border-collapse">
          <tbody>
            <tr><td className="pr-4 py-0.5 opacity-60">Frame</td><td>{displayFrame} / {TOTAL_FRAMES - 1}</td></tr>
            <tr><td className="pr-4 py-0.5 opacity-60">Focus X</td><td>{actualX.toFixed(1)}%</td></tr>
            <tr><td className="pr-4 py-0.5 opacity-60">Focus Y</td><td>{actualY.toFixed(1)}%</td></tr>
            <tr><td className="pr-4 py-0.5 opacity-60">Interpolation</td><td>{previewInterpolation ? "ON" : "OFF"}</td></tr>
            <tr><td className="pr-4 py-0.5 opacity-60">Canvas Size</td><td>{canvasW}x{canvasH}</td></tr>
            <tr><td className="pr-4 py-0.5 opacity-60">Image Size</td><td>{drawW.toFixed(0)}x{drawH.toFixed(0)}</td></tr>
            <tr><td className="pr-4 py-0.5 opacity-60">Offset</td><td>X: {drawX.toFixed(0)} Y: {drawY.toFixed(0)}</td></tr>
          </tbody>
        </table>
        
        <div className="mt-4 pt-3 border-t border-white/10 opacity-60 space-y-1">
          <div><kbd className="bg-white/10 px-1 rounded">Arrows</kbd> Adjust Focus</div>
          <div><kbd className="bg-white/10 px-1 rounded">PgUp/Dn</kbd> Change Frame</div>
          <div><kbd className="bg-white/10 px-1 rounded">Space</kbd> Toggle Interp</div>
          <div><kbd className="bg-white/10 px-1 rounded">R</kbd> Reset <kbd className="bg-white/10 px-1 rounded ml-1">C</kbd> Copy <kbd className="bg-white/10 px-1 rounded ml-1">S</kbd> Export</div>
          <div><kbd className="bg-white/10 px-1 rounded">Esc</kbd> Resume Scroll</div>
        </div>
      </div>

      {/* Target Crosshair */}
      <div 
        className="absolute w-8 h-8 border-2 border-red-500/50 rounded-full"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <div className="absolute w-full h-px bg-red-500/50 top-1/2 -translate-y-1/2" />
        <div className="absolute h-full w-px bg-red-500/50 left-1/2 -translate-x-1/2" />
      </div>
      
      {/* Face Safe Area (Rule of Thirds / Golden Ratio approximation for portrait) */}
      <div 
        className="absolute border border-blue-400/30 border-dashed"
        style={{
          left: "20%",
          right: "20%",
          top: "15%",
          bottom: "40%",
        }}
      >
        <div className="absolute -top-6 left-0 text-blue-400/50 text-[10px] font-mono uppercase tracking-widest">Face Safe Zone</div>
      </div>
    </div>
  );
}
