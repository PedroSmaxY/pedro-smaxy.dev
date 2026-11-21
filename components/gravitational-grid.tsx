"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive 2D dot-matrix canvas that subtly bends and illuminates dots
 * near the pointer, evoking gravitational lensing around the cursor.
 * Falls back to static CSS .dot-matrix on touch devices or reduced motion.
 */
export function GravitationalGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !finePointer) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let isVisible = true;
    const spacing = 24;
    const radius = 125;
    const maxPull = 7;

    const target = { x: -9999, y: -9999, active: false };
    const current = { x: -9999, y: -9999, strength: 0 };

    const onPointerMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      if (!target.active) {
        current.x = target.x;
        current.y = target.y;
      }
      target.active = true;
    };

    const onPointerLeave = () => {
      target.active = false;
    };

    parent.addEventListener("pointermove", onPointerMove);
    parent.addEventListener("pointerleave", onPointerLeave);

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(parent);

    const draw = () => {
      if (isVisible) {
        current.x += (target.x - current.x) * 0.12;
        current.y += (target.y - current.y) * 0.12;
        current.strength += ((target.active ? 1 : 0) - current.strength) * 0.1;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = parent.clientWidth;
        const h = parent.clientHeight;

        if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
          canvas.width = Math.floor(w * dpr);
          canvas.height = Math.floor(h * dpr);
        }

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);

        for (let gx = spacing * 0.5; gx < w; gx += spacing) {
          for (let gy = spacing * 0.5; gy < h; gy += spacing) {
            let drawX = gx;
            let drawY = gy;
            let alpha = 0.075;
            let size = 1;
            let r = 237;
            let g = 234;
            let b = 226;

            if (current.strength > 0.01) {
              const dx = current.x - gx;
              const dy = current.y - gy;
              const dist = Math.hypot(dx, dy);

              if (dist < radius && dist > 0.001) {
                const falloff = Math.pow(1 - dist / radius, 2) * current.strength;
                const pull = falloff * maxPull;
                drawX += (dx / dist) * pull;
                drawY += (dy / dist) * pull;
                alpha = 0.075 + falloff * 0.36;
                size = 1 + falloff * 0.85;

                // Subtle warm ember tint right at the cursor core
                if (falloff > 0.45) {
                  const core = (falloff - 0.45) / 0.55;
                  r = 255;
                  g = Math.round(234 - core * 96);
                  b = Math.round(226 - core * 150);
                }
              }
            }

            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(drawX, drawY, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      parent.removeEventListener("pointermove", onPointerMove);
      parent.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full hidden pointer-fine:block"
    />
  );
}
