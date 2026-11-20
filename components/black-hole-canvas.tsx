"use client";

import { useEffect, useRef, useState } from "react";

interface BlackHoleCanvasProps {
  title: string;
  hint: string;
}

const ASCII_RAMP = " .:-=+*#%@";

export function BlackHoleCanvas({ title, hint }: BlackHoleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<"ascii" | "halfblock">("ascii");

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let rafId = 0;
    let isVisible = true;
    let t = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onPointerMove = (e: PointerEvent) => {
      if (reduceMotion) return;
      const rect = canvas.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.5;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.4;
    };

    const onPointerLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const renderFrame = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.fillStyle = "#07080A";
      ctx.fillRect(0, 0, width, height);

      const cols = mode === "ascii" ? 56 : 72;
      const rows = mode === "ascii" ? 26 : 34;
      const cellW = width / cols;
      const cellH = height / rows;

      ctx.font = `${Math.max(10, Math.floor(cellH * 0.92))}px var(--font-mono), ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const nx = (x - cols / 2) / (cols * 0.25) - current.x;
          const ny = ((y - rows / 2) / (rows * 0.25)) * 1.35 - current.y;
          const r = Math.sqrt(nx * nx + ny * ny);
          const angle = Math.atan2(ny, nx);

          // Event horizon shadow
          if (r < 0.41) continue;

          // Keplerian differential shear + polar turbulence (inspired by disk_shader.rs)
          const omega = 1.45 / Math.pow(Math.max(r, 0.45), 1.35);
          const shearedPhi = angle - omega * t * 0.45;
          const rings = Math.sin(r * 6.5 + Math.cos(shearedPhi) * 0.85) * 0.5 + 0.5;
          const spiral = Math.sin(2.0 * shearedPhi + r * 2.4) * 0.5 + 0.5;
          const turbulence = 0.62 * rings + 0.38 * spiral;

          const diskProfile = Math.exp(-Math.pow((r - 0.88) * 2.1, 2));
          const doppler = 1.0 + 0.42 * Math.cos(angle - 0.35);
          const photonRing = Math.exp(-Math.pow((r - 0.46) * 8.2, 2)) * 0.92;

          const intensity = Math.min(
            1,
            Math.max(0, diskProfile * (0.45 + 0.65 * turbulence) * doppler + photonRing)
          );

          if (intensity > 0.07) {
            const g = Math.floor(62 + intensity * 142);
            const b = Math.floor(Math.max(0, intensity - 0.45) * 185);
            const alpha = Math.min(1, intensity * 1.15);
            ctx.fillStyle = `rgba(255, ${g}, ${b}, ${alpha})`;

            const glyph =
              mode === "ascii"
                ? ASCII_RAMP[
                    Math.min(
                      ASCII_RAMP.length - 1,
                      Math.floor(intensity * ASCII_RAMP.length)
                    )
                  ]
                : "▀";

            ctx.fillText(glyph, (x + 0.5) * cellW, (y + 0.5) * cellH);
          }
        }
      }
    };

    const tick = () => {
      if (isVisible) {
        renderFrame();
        t += 0.025;
      }
      if (!reduceMotion) {
        rafId = requestAnimationFrame(tick);
      }
    };

    renderFrame();
    if (!reduceMotion) {
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [mode]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col justify-between bg-[#07080A] h-full"
    >
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#EDEAE2]/10 font-mono text-[11px] text-[#9A968E]">
        <span>{title}</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setMode((prev) => (prev === "ascii" ? "halfblock" : "ascii"))
            }
            className="px-2 py-0.5 border border-[#EDEAE2]/15 hover:border-[#FF4D00] text-[#EDEAE2] transition-colors cursor-pointer"
            title="Toggle ASCII / Half-Block"
          >
            [M] {mode === "ascii" ? "ASCII" : "HALF-BLOCK"}
          </button>
          <span className="text-[#FF4D00] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
            60FPS
          </span>
        </div>
      </div>

      <div className="relative flex-1 min-h-[260px] sm:min-h-[300px] w-full overflow-hidden cursor-crosshair">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          aria-label="Interactive 4D Kerr-Schild Black Hole ASCII Simulation"
        />
        <span className="absolute bottom-3 left-4 font-mono text-[10px] tracking-wider uppercase text-[#9A968E]/80 pointer-events-none">
          [ {hint} ]
        </span>
      </div>

      <div className="grid grid-cols-3 border-t border-[#EDEAE2]/10 font-mono text-[11px] divide-x divide-[#EDEAE2]/10">
        <div className="p-3">
          <span className="block text-[#9A968E] text-[10px]">CORE</span>
          <span className="text-[#EDEAE2]">Rust · C# · Java</span>
        </div>
        <div className="p-3">
          <span className="block text-[#9A968E] text-[10px]">AI / MCP</span>
          <span className="text-[#EDEAE2]">Python · Typst</span>
        </div>
        <div className="p-3">
          <span className="block text-[#9A968E] text-[10px]">PRODUCT</span>
          <span className="text-[#EDEAE2]">Next.js · Tauri</span>
        </div>
      </div>
    </div>
  );
}
