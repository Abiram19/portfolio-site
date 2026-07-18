"use client";

import { useEffect, useRef, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { getFrameUrl, TOTAL_FRAMES } from "@/lib/frameUtils";

export interface HeroScene {
  id: string;
  startFrame: number;
  endFrame: number;
  desktop: {
    focusX: number;
    focusY: number;
  };
  mobile: {
    focusX: number;
    focusY: number;
  };
}

// Configurable focal-point scenes mapped to the video/image sequences
// These default ranges align with the TextSection timings in Overlay.tsx
export const heroScenes: HeroScene[] = [
  {
    id: "intro-abiram",
    startFrame: 0,
    endFrame: 43,
    desktop: { focusX: 50, focusY: 50 },
    // Center text - face centered but moved slightly higher to avoid text
    mobile: { focusX: 50, focusY: 35 },
  },
  {
    id: "building-intelligent-software",
    startFrame: 44,
    endFrame: 99,
    desktop: { focusX: 50, focusY: 50 },
    // Left text - subject moves slightly right
    mobile: { focusX: 66, focusY: 50 },
  },
  {
    id: "from-research",
    startFrame: 100,
    endFrame: 159,
    desktop: { focusX: 50, focusY: 50 },
    // Right text - subject moves slightly left
    mobile: { focusX: 34, focusY: 50 },
  },
  {
    id: "extraordinary",
    startFrame: 160,
    endFrame: 199,
    desktop: { focusX: 50, focusY: 50 },
    // Center text - face centered
    mobile: { focusX: 50, focusY: 40 },
  }
];

// Precompute scene lookup table for O(1) access during requestAnimationFrame
// This eliminates the need for .find() during high-frequency scroll events
const precomputedFocalPoints = Array.from({ length: TOTAL_FRAMES }, (_, index) => {
  const scene = heroScenes.find(s => index >= s.startFrame && index <= s.endFrame) || heroScenes[0];
  return {
    desktop: {
      x: scene.desktop.focusX / 100,
      y: scene.desktop.focusY / 100,
    },
    mobile: {
      x: scene.mobile.focusX / 100,
      y: scene.mobile.focusY / 100,
    }
  };
});

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

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

    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    // object-fit: cover math
    const scale = Math.max(canvasW / imgW, canvasH / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;

    // Determine current precomputed focal point mapping
    const focalPoint = precomputedFocalPoints[index] || precomputedFocalPoints[0];
    
    // Check if mobile (using CSS pixels). Breakpoint 768px.
    const dpr = window.devicePixelRatio || 1;
    const isMobile = (canvasW / dpr) < 768;

    const focalX = isMobile ? focalPoint.mobile.x : focalPoint.desktop.x;
    const focalY = isMobile ? focalPoint.mobile.y : focalPoint.desktop.y;

    const drawX = (canvasW - drawW) * focalX;
    const drawY = (canvasH - drawH) * focalY;

    ctx.clearRect(0, 0, canvasW, canvasH);
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

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: "500vh" }}
    >
      {/* Sticky viewport */}
      <div aria-hidden="true" className="sticky top-0 h-screen w-full overflow-hidden bg-[#0d0d0d]">
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
