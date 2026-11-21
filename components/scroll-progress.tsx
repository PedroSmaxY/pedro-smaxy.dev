"use client";

import { useEffect, useRef } from "react";
import { createMotionScope, gsap } from "@/lib/motion";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    return createMotionScope(el, ({ reduceMotion }) => {
      if (reduceMotion) return;

      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="h-px w-full bg-[#FF4D00] origin-left pointer-events-none"
    />
  );
}
