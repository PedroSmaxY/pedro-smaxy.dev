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
  ease: "expo.out",
  easeInOut: "power2.inOut",
  cssEaseOut: "cubic-bezier(0.22, 1, 0.36, 1)",
  duration: {
    micro: 0.18,
    state: 0.32,
    enter: 0.65,
  },
  stagger: 0.05,
} as const;

/**
 * Runs GSAP setup inside a gsap.matchMedia() context that automatically
 * disables motion when prefers-reduced-motion: reduce is active.
 */
export function createMotionScope(
  scope: HTMLElement | null,
  setup: (ctx: { reduceMotion: boolean }) => void | (() => void)
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
      return setup({ reduceMotion });
    },
    scope
  );

  return () => mm.revert();
}

export { gsap, ScrollTrigger };
