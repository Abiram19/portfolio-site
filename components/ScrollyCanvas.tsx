"use client";

import { useEffect, useRef, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { getFrameUrl, TOTAL_FRAMES } from "@/lib/frameUtils";
import { getFrameFocalPoint } from "./render/frameLookup";
import DebugOverlay from "./render/DebugOverlay";

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Orchestration state refs for DebugOverlay (zero React rerenders during scroll)
  const debugMetricsRef = useRef({ canvasW: 0, canvasH: 0, drawW: 0, drawH: 0 });
  const liveFocalPointRef = useRef<{ x: number; y: number } | null>(null);
  const debugOverrideFrameRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Draw a specific frame to canvas with cover logic
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];

    if (!canvas || !ctx || !img || !img.complete) return;

    // ctx.scale(dpr, dpr) is applied after each resize, so all draw calls
    // operate in CSS-pixel coordinate space. We must use CSS pixel dimensions
    // for all cover math — NOT canvas.width which is in physical pixels.
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.width / dpr;
    const cssH = canvas.height / dpr;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    // object-fit: cover math (in CSS pixel space)
    const scale = Math.max(cssW / imgW, cssH / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;

    // Store metrics for debug overlay to access without causing rerenders
    if (process.env.NODE_ENV === "development") {
      debugMetricsRef.current = { canvasW: cssW, canvasH: cssH, drawW, drawH };
    }

    // Determine current precomputed focal point mapping
    const focalPoint = getFrameFocalPoint(index);
    
    let focalX = 0.5;
    let focalY = 0.5;

    const drawX = (cssW - drawW) * focalX;
    const drawY = (cssH - drawH) * focalY;

    ctx.clearRect(0, 0, cssW, cssH);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Helper to load a specific frame by index
  const loadFrame = useCallback((index: number, priority = false) => {
    if (index < 0 || index >= TOTAL_FRAMES) return undefined;
    if (imagesRef.current[index]) return imagesRef.current[index];

    const img = new Image();
    img.fetchPriority = priority ? "high" : "low";
    img.src = getFrameUrl(index);
    imagesRef.current[index] = img;

    img.onload = () => {
      // If this frame happens to be the currently requested frame or frame 0, draw it immediately
      if (index === currentFrameRef.current || (index === 0 && currentFrameRef.current === 0)) {
        drawFrame(index);
      }
    };

    return img;
  }, [drawFrame]);

  // Resize canvas to match device pixel ratio
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Redraw current frame after resize
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Progressive image loading sequence: prioritize LCP frame 0 and immediate scroll range, then batch remaining
  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES);

    // 1. Immediately load Frame 0 with high priority for LCP
    loadFrame(0, true);

    // 2. Load immediate initial scroll range (1-15)
    for (let i = 1; i <= 15; i++) {
      loadFrame(i, false);
    }

    // 3. Stagger remaining frames in background batches to prevent network and CPU bottleneck during initial page load
    const batchSize = 15;
    const startBatchIndex = 16;
    const totalBatches = Math.ceil((TOTAL_FRAMES - startBatchIndex) / batchSize);

    for (let b = 0; b < totalBatches; b++) {
      const timer = setTimeout(() => {
        const start = startBatchIndex + b * batchSize;
        const end = Math.min(start + batchSize, TOTAL_FRAMES);
        for (let i = start; i < end; i++) {
          loadFrame(i, false);
        }
      }, 150 + b * 120);
      timersRef.current.push(timer);
    }

    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
    };
  }, [loadFrame]);

  // Set up canvas + resize observer
  useEffect(() => {
    resizeCanvas();

    const observer = new ResizeObserver(() => resizeCanvas());
    observer.observe(document.body);

    return () => observer.disconnect();
  }, [resizeCanvas]);

  // Map scroll progress to frame index via RAF with fallback nearest-loaded-frame drawing
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // If debug mode is overriding the frame, freeze scroll progression
    if (process.env.NODE_ENV === "development" && debugOverrideFrameRef.current !== null) {
      return;
    }

    const rawIndex = Math.round(latest * (TOTAL_FRAMES - 1));
    const frameIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, rawIndex));

    if (frameIndex === currentFrameRef.current) return;
    currentFrameRef.current = frameIndex;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const targetImg = imagesRef.current[frameIndex];
      if (targetImg && targetImg.complete) {
        drawFrame(frameIndex);
      } else {
        // Trigger immediate high priority load if user scrolled fast and frame not yet ready
        loadFrame(frameIndex, true);

        // Find nearest loaded frame to draw temporarily without visual layout jump/black flash
        let closestIndex = -1;
        for (let step = 1; step < TOTAL_FRAMES; step++) {
          const down = frameIndex - step;
          if (down >= 0 && imagesRef.current[down]?.complete) {
            closestIndex = down;
            break;
          }
          const up = frameIndex + step;
          if (up < TOTAL_FRAMES && imagesRef.current[up]?.complete) {
            closestIndex = up;
            break;
          }
        }
        if (closestIndex !== -1) {
          drawFrame(closestIndex);
        }
      }
    });
  });

  // Debug methods
  const handleFocalPointUpdate = useCallback((frame: number, x: number, y: number) => {
    liveFocalPointRef.current = { x, y };
    // We intentionally ignore triggering a redraw here if we only updated the livePoint, 
    // unless we also want the visual to instantly respond. Let's redraw.
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => drawFrame(frame));
  }, [drawFrame]);

  const handleOverrideFrame = useCallback((frame: number | null) => {
    debugOverrideFrameRef.current = frame;
    if (frame !== null) {
      currentFrameRef.current = frame;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(frame));
    }
  }, [drawFrame]);

  const getMetrics = useCallback(() => debugMetricsRef.current, []);
  const getCurrentFrame = useCallback(() => currentFrameRef.current, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: "500vh" }}
    >
      {/* Sticky viewport */}
      <div aria-hidden="true" className="sticky top-0 h-screen w-full overflow-hidden bg-[#0d0d0d]">
        <DebugOverlay 
          getCurrentFrame={getCurrentFrame}
          overrideFrame={handleOverrideFrame}
          onFocalPointUpdate={handleFocalPointUpdate}
          getMetrics={getMetrics}
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />

        {/* Subtle vignette overlay for cinematic depth */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(13,13,13,0.7) 100%)",
          }}
        />

        {/* Bottom fade-out into the next section */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] h-40"
          style={{
            background: "linear-gradient(to bottom, transparent, #0d0d0d)",
          }}
        />
      </div>
    </div>
  );
}
