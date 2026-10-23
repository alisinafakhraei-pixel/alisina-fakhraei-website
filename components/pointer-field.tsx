"use client";

import { useEffect, useRef, useState } from "react";

const ICE = "142, 202, 242";
const GAP = 28;
const REACH = 132;

export function PointerField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setArmed(!reduce.matches && fine.matches);
    sync();
    reduce.addEventListener("change", sync);
    fine.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      fine.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!armed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let x = -9999;
    let y = -9999;

    const paint = () => {
      frame = 0;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelWidth = Math.round(width * dpr);
      const pixelHeight = Math.round(height * dpr);
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }
      context.clearRect(0, 0, pixelWidth, pixelHeight);
      if (x < 0 || y < 0) return;

      const startX = Math.max(0, Math.floor((x - REACH) / GAP) * GAP);
      const endX = Math.min(width, x + REACH);
      const startY = Math.max(0, Math.floor((y - REACH) / GAP) * GAP);
      const endY = Math.min(height, y + REACH);

      for (let gx = startX; gx <= endX; gx += GAP) {
        for (let gy = startY; gy <= endY; gy += GAP) {
          const distance = Math.hypot(gx - x, gy - y);
          if (distance > REACH) continue;
          const near = 1 - distance / REACH;
          context.beginPath();
          context.fillStyle = `rgba(${ICE}, ${(0.12 + near * 0.88).toFixed(3)})`;
          context.arc(gx * dpr, gy * dpr, (0.8 + near * 1.7) * dpr, 0, Math.PI * 2);
          context.fill();
        }
      }
    };

    const requestPaint = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      requestPaint();
    };

    const onLeave = () => {
      x = -9999;
      y = -9999;
      requestPaint();
    };

    const onResize = () => requestPaint();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("resize", onResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [armed]);

  if (!armed) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 h-full w-full"
      aria-hidden
    />
  );
}
