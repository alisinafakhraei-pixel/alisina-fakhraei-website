"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.MeshGradient),
  { ssr: false },
);

const colors = [
  "#161022",
  "#1c4c56",
  "#2f9eae",
  "#d4784a",
  "#6a3d9a",
  "#0e1420",
  "#e7b89a",
];

export function HeroShader() {
  const [mode, setMode] = useState<"pending" | "static" | "live">("pending");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData,
    );
    const start = () => setMode(reduce || saveData ? "static" : "live");
    const idleId = window.requestIdleCallback?.(start, { timeout: 1000 });
    const timer =
      idleId === undefined ? window.setTimeout(start, 350) : undefined;

    return () => {
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (mode !== "live") return;
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [mode]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="shader-fallback absolute inset-0" />
      {mode !== "pending" ? (
        <MeshGradient
          colors={colors}
          distortion={0.5}
          swirl={0.18}
          grainMixer={0.16}
          grainOverlay={0.18}
          speed={mode === "live" && !hidden ? 0.18 : 0}
          scale={1.15}
          fit="cover"
          minPixelRatio={1}
          maxPixelCount={900_000}
          style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
        />
      ) : null}
      <div className="shader-scrim absolute inset-0" />
    </div>
  );
}
