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
    let lastTime = 0;
    const spacing = 24;
    const radius = 104;
    const maxPull = 3.2;

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

      // Pass 1: batch all resting dots in a single path/fill call
      ctx.fillStyle = "rgba(237, 234, 226, 0.068)";
      ctx.beginPath();

      const hasField = current.strength > 0.004;
      const r2Limit = radius * radius;
      const activeDots: Array<{ gx: number; gy: number; dist: number }> = [];

      for (let gx = spacing * 0.5; gx < w; gx += spacing) {
        for (let gy = spacing * 0.5; gy < h; gy += spacing) {
          if (hasField) {
            const dx = current.x - gx;
            const dy = current.y - gy;
            const d2 = dx * dx + dy * dy;
            if (d2 < r2Limit && d2 > 0.0001) {
              activeDots.push({ gx, gy, dist: Math.sqrt(d2) });
              continue;
            }
          }
          ctx.moveTo(gx + 1, gy);
          ctx.arc(gx, gy, 1, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // Pass 2: draw only the dots inside the active lensing radius
      for (let i = 0; i < activeDots.length; i++) {
        const { gx, gy, dist } = activeDots[i];
        const dx = current.x - gx;
        const dy = current.y - gy;
        const u = 1 - dist / radius;
        const falloff = u * u * (3 - 2 * u) * current.strength;
        const centerDamp = Math.min(1, dist / 10);
        const pull = falloff * maxPull * centerDamp;
        const drawX = gx + (dx / dist) * pull;
        const drawY = gy + (dy / dist) * pull;
        const alpha = 0.068 + falloff * 0.16;
        const size = 1 + falloff * 0.38;

        let r = 237;
        let g = 234;
        let b = 226;
        if (falloff > 0.35) {
          const core = (falloff - 0.35) / 0.65;
          r = Math.round(237 + core * 18);
          g = Math.round(234 - core * 96);
          b = Math.round(226 - core * 150);
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const draw = (now: number) => {
      if (!isVisible) {
        isRunning = false;
        lastTime = 0;
        return;
      }

      const dt = lastTime ? Math.min(0.05, (now - lastTime) / 1000) : 1 / 60;
      lastTime = now;

      const posFactor = 1 - Math.exp(-16 * dt);
      const strengthSpeed = target.active ? 11 : 5;
      const strengthFactor = 1 - Math.exp(-strengthSpeed * dt);

      current.x += (target.x - current.x) * posFactor;
      current.y += (target.y - current.y) * posFactor;
      current.strength +=
        ((target.active ? 1 : 0) - current.strength) * strengthFactor;

      renderGrid();

      if (target.active || current.strength >= 0.004) {
        rafId = requestAnimationFrame(draw);
      } else {
        current.strength = 0;
        lastTime = 0;
        isRunning = false;
      }
    };

    const startLoop = () => {
      if (reduceMotion) return;
      if (!isRunning && isVisible) {
        isRunning = true;
        lastTime = 0;
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
        current.strength = 0.65;
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
