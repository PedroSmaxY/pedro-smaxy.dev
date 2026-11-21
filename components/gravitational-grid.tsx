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

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let isRunning = false;
    let isVisible = true;
    let hasPulsed = false;
    const spacing = 24;
    const radius = 125;
    const maxPull = 7;

    const target = { x: -9999, y: -9999, active: false };
    const current = { x: -9999, y: -9999, strength: 0 };

    const renderGrid = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;

      if (
        canvas.width !== Math.floor(w * dpr) ||
        canvas.height !== Math.floor(h * dpr)
      ) {
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

          if (current.strength > 0.005) {
            const dx = current.x - gx;
            const dy = current.y - gy;
            const dist = Math.hypot(dx, dy);

            if (dist < radius && dist > 0.001) {
              const falloff =
                Math.pow(1 - dist / radius, 2) * current.strength;
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
    };

    const draw = () => {
      if (!isVisible) {
        isRunning = false;
        return;
      }

      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      current.strength += ((target.active ? 1 : 0) - current.strength) * 0.1;

      renderGrid();

      if (target.active || current.strength >= 0.005) {
        rafId = requestAnimationFrame(draw);
      } else {
        current.strength = 0;
        isRunning = false;
      }
    };

    const startLoop = () => {
      if (reduceMotion) return;
      if (!isRunning && isVisible) {
        isRunning = true;
        rafId = requestAnimationFrame(draw);
      }
    };

    const activateAt = (clientX: number, clientY: number) => {
      if (reduceMotion) return;
      const rect = parent.getBoundingClientRect();
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return;
      }
      target.x = clientX - rect.left;
      target.y = clientY - rect.top;
      if (!target.active && current.strength < 0.02) {
        current.x = target.x;
        current.y = target.y;
      }
      target.active = true;
      startLoop();
    };

    const deactivate = () => {
      if (reduceMotion) return;
      target.active = false;
      startLoop();
    };

    const triggerWelcomePulse = () => {
      if (reduceMotion || finePointer || hasPulsed) return;
      hasPulsed = true;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w > 0 && h > 0) {
        current.x = w * 0.55;
        current.y = h * 0.42;
        target.x = w * 0.62;
        target.y = h * 0.36;
        current.strength = 0.85;
        target.active = false;
        startLoop();
      }
    };

    const onPointerMove = (e: PointerEvent) => activateAt(e.clientX, e.clientY);
    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) activateAt(touch.clientX, touch.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) activateAt(touch.clientX, touch.clientY);
    };

    if (!reduceMotion) {
      parent.addEventListener("pointerdown", onPointerMove);
      parent.addEventListener("pointermove", onPointerMove);
      parent.addEventListener("pointerleave", deactivate);
      parent.addEventListener("pointerup", deactivate);
      parent.addEventListener("pointercancel", deactivate);
      parent.addEventListener("touchstart", onTouchStart, { passive: true });
      parent.addEventListener("touchmove", onTouchMove, { passive: true });
      parent.addEventListener("touchend", deactivate, { passive: true });
      parent.addEventListener("touchcancel", deactivate, { passive: true });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) {
          renderGrid();
          triggerWelcomePulse();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(parent);

    const resizeObserver = new ResizeObserver(() => {
      if (isVisible && !isRunning) {
        renderGrid();
      }
    });
    resizeObserver.observe(parent);

    renderGrid();

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      resizeObserver.disconnect();
      if (!reduceMotion) {
        parent.removeEventListener("pointerdown", onPointerMove);
        parent.removeEventListener("pointermove", onPointerMove);
        parent.removeEventListener("pointerleave", deactivate);
        parent.removeEventListener("pointerup", deactivate);
        parent.removeEventListener("pointercancel", deactivate);
        parent.removeEventListener("touchstart", onTouchStart);
        parent.removeEventListener("touchmove", onTouchMove);
        parent.removeEventListener("touchend", deactivate);
        parent.removeEventListener("touchcancel", deactivate);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full block"
    />
  );
}
