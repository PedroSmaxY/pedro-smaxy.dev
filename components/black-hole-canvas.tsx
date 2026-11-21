"use client";

import { useEffect, useRef, useState } from "react";

interface BlackHoleCanvasProps {
  title: string;
  hint: string;
}

const ASCII_RAMP = " .:-=+*#%@";

function hash3(ix: number, iy: number, iz: number): number {
  let n =
    (Math.imul(ix | 0, 374761393) +
      Math.imul(iy | 0, 668265263) +
      Math.imul(iz | 0, 2147483647)) |
    0;
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  n = n ^ (n >>> 16);
  return (n >>> 0) / 4294967295;
}

/**
 * Port of GalacticSky (galactic_sky.rs): 6-face cube-map projection + 3x3 Worley
 * search so lensed rays near the photon sphere form crisp Einstein rings.
 */
function sampleGalacticSky(
  dx: number,
  dy: number,
  dz: number,
  time: number
): [number, number, number] {
  const ax = Math.abs(dx);
  const ay = Math.abs(dy);
  const az = Math.abs(dz);

  let face = 0;
  let u = 0;
  let v = 0;

  if (ax >= ay && ax >= az) {
    if (dx > 0) {
      face = 0;
      u = -dz / ax;
      v = dy / ax;
    } else {
      face = 1;
      u = dz / ax;
      v = dy / ax;
    }
  } else if (ay >= ax && ay >= az) {
    if (dy > 0) {
      face = 2;
      u = dx / ay;
      v = -dz / ay;
    } else {
      face = 3;
      u = dx / ay;
      v = dz / ay;
    }
  } else if (dz > 0) {
    face = 4;
    u = dx / az;
    v = dy / az;
  } else {
    face = 5;
    u = -dx / az;
    v = dy / az;
  }

  const gridN = 26.0;
  const density = 0.045;
  const invR2 = 34.0;
  const gx = (u * 0.5 + 0.5) * gridN;
  const gy = (v * 0.5 + 0.5) * gridN;
  const cx = Math.floor(gx);
  const cy = Math.floor(gy);

  let sr = 0;
  let sg = 0;
  let sb = 0;

  for (let oy = -1; oy <= 1; oy++) {
    for (let ox = -1; ox <= 1; ox++) {
      const nx = cx + ox;
      const ny = cy + oy;
      const h = hash3(nx + face * 1024, ny, face * 313 + 7);
      if (h < 1.0 - density) continue;

      const jx = 0.2 + 0.6 * hash3(nx + 17, ny + face * 97, 13);
      const jy = 0.2 + 0.6 * hash3(nx - 23, ny + 41, face * 53);
      const px = nx + jx - gx;
      const py = ny + jy - gy;
      const dist2 = px * px + py * py;
      const core = Math.exp(-dist2 * invR2);
      if (core < 0.06) continue;

      const tempSeed = hash3(nx + 7, ny - 11, face * 19);
      const twinkle = 0.88 + 0.12 * Math.sin(time * 2.0 + h * 40.0);
      const mag = 0.45 + 0.55 * ((h - (1.0 - density)) / density);
      const b = mag * core * twinkle * 0.42;

      // Stellar temperature variation (cool blue-white to warm ivory/amber)
      if (tempSeed < 0.35) {
        sr += b * 0.78;
        sg += b * 0.88;
        sb += b * 1.0;
      } else if (tempSeed < 0.75) {
        sr += b * 0.96;
        sg += b * 0.95;
        sb += b * 0.92;
      } else {
        sr += b * 1.0;
        sg += b * 0.82;
        sb += b * 0.64;
      }
    }
  }

  return [Math.min(1, sr), Math.min(1, sg), Math.min(1, sb)];
}

/**
 * Integrates a single 3D null geodesic using the reduced Schwarzschild Binet
 * equation (d2x/dl2 = -1.5 * rs * |h|^2 / |x|^5 * x) and returns linear [r, g, b].
 */
function traceGeodesic(
  camX: number,
  camY: number,
  camZ: number,
  dirX: number,
  dirY: number,
  dirZ: number,
  time: number
): [number, number, number] {
  const rs = 1.0;
  const rIsco = 2.7;
  const rOuter = 8.6;

  // Angular momentum h = pos x dir
  const hx = camY * dirZ - camZ * dirY;
  const hy = camZ * dirX - camX * dirZ;
  const hz = camX * dirY - camY * dirX;
  const h2 = hx * hx + hy * hy + hz * hz;

  let px = camX;
  let py = camY;
  let pz = camZ;
  let vx = dirX;
  let vy = dirY;
  let vz = dirZ;

  let accR = 0;
  let accG = 0;
  let accB = 0;
  let transmittance = 1.0;

  for (let step = 0; step < 26; step++) {
    const r2 = px * px + py * py + pz * pz;
    const r = Math.sqrt(r2);

    if (r <= 1.04) {
      return [accR, accG, accB];
    }

    if (r > 18.5 && px * vx + py * vy + pz * vz > 0) {
      const vLen = Math.sqrt(vx * vx + vy * vy + vz * vz) || 1;
      const [sr, sg, sb] = sampleGalacticSky(
        vx / vLen,
        vy / vLen,
        vz / vLen,
        time
      );
      return [
        Math.min(1, accR + sr * transmittance),
        Math.min(1, accG + sg * transmittance),
        Math.min(1, accB + sb * transmittance),
      ];
    }

    const dt = Math.max(0.15, Math.min(1.15, r * 0.18));
    const r5 = r2 * r2 * r;
    const k = (-1.5 * rs * h2) / r5;

    const prevX = px;
    const prevY = py;
    const prevZ = pz;

    vx += k * px * dt;
    vy += k * py * dt;
    vz += k * pz * dt;

    px += vx * dt;
    py += vy * dt;
    pz += vz * dt;

    // Equatorial accretion disk crossing (y = 0)
    if ((prevY > 0 && py <= 0) || (prevY < 0 && py >= 0)) {
      const frac = Math.abs(prevY) / (Math.abs(prevY - py) + 1e-6);
      const cx = prevX + (px - prevX) * frac;
      const cz = prevZ + (pz - prevZ) * frac;
      const cr = Math.sqrt(cx * cx + cz * cz);

      if (cr >= rIsco && cr <= rOuter) {
        const phi = Math.atan2(cz, cx);
        const omega = 1.65 / Math.pow(cr, 1.35);
        const sheared = phi - omega * time * 0.65;

        const rings = Math.sin(cr * 3.8 + Math.cos(sheared) * 0.8) * 0.5 + 0.5;
        const spiral = Math.sin(2.0 * sheared + cr * 1.45) * 0.5 + 0.5;
        const turb = 0.58 * rings + 0.42 * spiral;

        const radialFade = Math.sin(
          ((cr - rIsco) / (rOuter - rIsco)) * Math.PI
        );
        const innerBoost = Math.exp(-(cr - rIsco) * 0.42);

        const tx = -cz / cr;
        const tz = cx / cr;
        const vLen = Math.sqrt(vx * vx + vy * vy + vz * vz) || 1;
        const cosAlpha = (-vx * tx - vz * tz) / vLen;
        const beta = Math.min(0.58, Math.sqrt(0.5 / cr));
        const doppler = 1.0 / Math.max(0.46, 1.0 - beta * cosAlpha);
        const beaming = Math.pow(doppler, 2.0);

        const intensity = Math.min(
          1.2,
          (0.45 + 0.55 * turb) *
            (0.62 * radialFade + 0.68 * innerBoost) *
            beaming
        );

        const heat = Math.min(1, intensity * 0.88);
        const dr = Math.min(1, heat * 1.32);
        const dg = Math.min(1, Math.pow(heat, 1.32) * 0.84);
        const db = Math.min(
          1,
          Math.pow(Math.max(0, heat - 0.38), 1.8) * 1.05
        );

        const opacity = Math.min(0.92, 0.42 + intensity * 0.5);
        accR += dr * opacity * transmittance;
        accG += dg * opacity * transmittance;
        accB += db * opacity * transmittance;
        transmittance *= 1 - opacity * 0.78;
      }
    }
  }

  // Only sample GalacticSky for rays that actually cleared the photon sphere
  const endR = Math.sqrt(px * px + py * py + pz * pz);
  if (transmittance > 0.02 && endR > 3.5) {
    const vLen = Math.sqrt(vx * vx + vy * vy + vz * vz) || 1;
    const [sr, sg, sb] = sampleGalacticSky(
      vx / vLen,
      vy / vLen,
      vz / vLen,
      time
    );
    accR += sr * transmittance;
    accG += sg * transmittance;
    accB += sb * transmittance;
  }

  return [Math.min(1, accR), Math.min(1, accG), Math.min(1, accB)];
}

export function BlackHoleCanvas({ title, hint }: BlackHoleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<"ascii" | "halfblock">("ascii");

  // Keyboard shortcut [M] to toggle ASCII / HALF-BLOCK like the Rust terminal app
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "m" || e.key === "M") {
        setMode((prev) => (prev === "ascii" ? "halfblock" : "ascii"));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Offscreen pixel buffer for high-res Half-Block rendering (1 draw call/frame)
    const hbCols = 136;
    const hbRows = 76;
    const offscreen = document.createElement("canvas");
    offscreen.width = hbCols;
    offscreen.height = hbRows;
    const offCtx = offscreen.getContext("2d");
    const imgData = offCtx?.createImageData(hbCols, hbRows) ?? null;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let rafId = 0;
    let isVisible = true;
    let t = 0;
    const target = { yaw: 0, pitch: 0.25 };
    const current = { yaw: 0, pitch: 0.25 };

    const onPointerMove = (e: PointerEvent) => {
      if (reduceMotion) return;
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      target.yaw = nx * 0.75;
      target.pitch = Math.max(0.06, Math.min(0.65, 0.25 - ny * 0.42));
    };

    const onPointerLeave = () => {
      target.yaw = 0;
      target.pitch = 0.25;
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
      current.yaw += (target.yaw - current.yaw) * 0.08;
      current.pitch += (target.pitch - current.pitch) * 0.08;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = Math.max(1, canvas.clientWidth);
      const cssH = Math.max(1, canvas.clientHeight);
      const width = Math.floor(cssW * dpr);
      const height = Math.floor(cssH * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Keep camDist inside traceGeodesic escape radius (18.5) and widen FOV on narrow laptop viewports
      const aspect = cssW / cssH;
      const camDist = 17.5;
      const yaw = current.yaw + t * 0.08;
      const pitch = current.pitch;
      const cosP = Math.cos(pitch);
      const camX = camDist * cosP * Math.sin(yaw);
      const camY = camDist * Math.sin(pitch);
      const camZ = camDist * cosP * Math.cos(yaw);

      const fLen = Math.sqrt(camX * camX + camY * camY + camZ * camZ) || 1;
      const fx = -camX / fLen;
      const fy = -camY / fLen;
      const fz = -camZ / fLen;

      let rx = -fz;
      let rz = fx;
      const rLen = Math.sqrt(rx * rx + rz * rz) || 1;
      rx /= rLen;
      rz /= rLen;

      const ux = -rz * fy;
      const uy = rz * fx - rx * fz;
      const uz = rx * fy;

      const tanFov = aspect < 1.25 ? 0.58 / Math.max(0.55, aspect) : 0.48;

      if (mode === "halfblock" && offCtx && imgData) {
        const data = imgData.data;
        for (let y = 0; y < hbRows; y++) {
          const sy = (1.0 - ((y + 0.5) / hbRows) * 2.0) * tanFov;
          for (let x = 0; x < hbCols; x++) {
            const sx = (((x + 0.5) / hbCols) * 2.0 - 1.0) * tanFov * aspect;

            const dx = fx + rx * sx + ux * sy;
            const dy = fy + uy * sy;
            const dz = fz + rz * sx + uz * sy;
            const dLen = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;

            const [r, g, b] = traceGeodesic(
              camX,
              camY,
              camZ,
              dx / dLen,
              dy / dLen,
              dz / dLen,
              t
            );

            const pIdx = (y * hbCols + x) * 4;
            const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            if (lum < 0.012) {
              data[pIdx] = 7;
              data[pIdx + 1] = 8;
              data[pIdx + 2] = 10;
              data[pIdx + 3] = 255;
            } else {
              data[pIdx] = Math.min(255, Math.round(r * 255));
              data[pIdx + 1] = Math.min(255, Math.round(g * 255));
              data[pIdx + 2] = Math.min(255, Math.round(b * 255));
              data[pIdx + 3] = 255;
            }
          }
        }

        offCtx.putImageData(imgData, 0, 0);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(offscreen, 0, 0, cssW, cssH);
        return;
      }

      // High-res ASCII mode (96 x 44)
      ctx.fillStyle = "#07080A";
      ctx.fillRect(0, 0, cssW, cssH);

      const cols = 96;
      const rows = 44;
      const cellW = cssW / cols;
      const cellH = cssH / rows;

      ctx.font = `${Math.max(7, Math.floor(cellH * 0.96))}px var(--font-mono), ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let y = 0; y < rows; y++) {
        const sy = (1.0 - ((y + 0.5) / rows) * 2.0) * tanFov;
        for (let x = 0; x < cols; x++) {
          const sx = (((x + 0.5) / cols) * 2.0 - 1.0) * tanFov * aspect;

          const dx = fx + rx * sx + ux * sy;
          const dy = fy + uy * sy;
          const dz = fz + rz * sx + uz * sy;
          const dLen = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;

          const [r, g, b] = traceGeodesic(
            camX,
            camY,
            camZ,
            dx / dLen,
            dy / dLen,
            dz / dLen,
            t
          );

          const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          if (lum < 0.012) continue;

          const ir = Math.min(255, Math.round(r * 255));
          const ig = Math.min(255, Math.round(g * 255));
          const ib = Math.min(255, Math.round(b * 255));
          ctx.fillStyle = `rgb(${ir}, ${ig}, ${ib})`;

          const idx = Math.min(
            ASCII_RAMP.length - 1,
            Math.floor(Math.min(1, lum) * ASCII_RAMP.length)
          );
          const ch = ASCII_RAMP[idx];
          if (ch !== " ") {
            ctx.fillText(ch, (x + 0.5) * cellW, (y + 0.5) * cellH);
          }
        }
      }
    };

    const tick = () => {
      if (isVisible) {
        renderFrame();
        t += 0.028;
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
            aria-pressed={mode === "halfblock"}
            onClick={() =>
              setMode((prev) => (prev === "ascii" ? "halfblock" : "ascii"))
            }
            className="px-2 py-0.5 border border-[#EDEAE2]/15 hover:border-[#FF4D00] text-[#EDEAE2] transition-colors cursor-pointer"
            title="Toggle ASCII / Half-Block (Key: M)"
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
          aria-label="Interactive 3D Geodesic Black Hole ASCII Simulation with GalacticSky Lensing"
        />
        <span className="absolute bottom-3 left-4 font-mono text-[10px] tracking-wider uppercase text-[#9A968E]/80 pointer-events-none">
          [ {hint} ]
        </span>
      </div>

      <div className="grid grid-cols-3 border-t border-[#EDEAE2]/10 font-mono text-[11px] divide-x divide-[#EDEAE2]/10">
        <div data-bh-cell className="p-3">
          <span className="block text-[#9A968E] text-[10px]">CORE</span>
          <span className="text-[#EDEAE2]">Rust · C# · Java</span>
        </div>
        <div data-bh-cell className="p-3">
          <span className="block text-[#9A968E] text-[10px]">AI / MCP</span>
          <span className="text-[#EDEAE2]">Python · Typst</span>
        </div>
        <div data-bh-cell className="p-3">
          <span className="block text-[#9A968E] text-[10px]">PRODUCT</span>
          <span className="text-[#EDEAE2]">Next.js · Tauri</span>
        </div>
      </div>
    </div>
  );
}
