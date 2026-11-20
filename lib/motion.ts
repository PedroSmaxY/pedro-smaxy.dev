"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsapRegistered() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export const MOTION = {
  ease: "power3.out",
  easeInOut: "power2.inOut",
  duration: {
    micro: 0.2,
    enter: 0.65,
    section: 0.85,
  },
  stagger: 0.06,
} as const;

/**
 * Runs GSAP setup inside a gsap.matchMedia() context that automatically
 * disables motion when prefers-reduced-motion: reduce is active.
 */
export function createMotionScope(
  scope: HTMLElement | null,
  setup: (ctx: { reduceMotion: boolean }) => void
): () => void {
  if (!scope || typeof window === "undefined") return () => {};
  ensureGsapRegistered();

  const mm = gsap.matchMedia();
  mm.add(
    {
      reduceMotion: "(prefers-reduced-motion: reduce)",
      normalMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const reduceMotion = Boolean(context.conditions?.reduceMotion);
      setup({ reduceMotion });
    },
    scope
  );

  return () => mm.revert();
}

export { gsap, ScrollTrigger };
