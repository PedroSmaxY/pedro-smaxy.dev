"use client";

import { useEffect, useRef } from "react";
import { GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";
import { createMotionScope, gsap, MOTION } from "@/lib/motion";

export type Education = {
  institution: string;
  degree: string;
  period: string;
};

export function Education() {
  const t = useTranslations("portfolio.education");
  const rootRef = useRef<HTMLElement | null>(null);
  const educationExperience = t.raw("educationExperience") as Education[];
  const focusAreas = t.raw("focusAreas") as string[];

  useEffect(() => {
    return createMotionScope(rootRef.current, ({ reduceMotion }) => {
      if (reduceMotion) return;

      gsap.fromTo(
        "[data-edu-bar]",
        { scaleX: 0 },
        {
          scaleX: 0.95,
          duration: 0.85,
          ease: MOTION.ease,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={rootRef}
      className="grid lg:grid-cols-12 border-b border-[#EDEAE2]/10"
      aria-labelledby="education-title"
    >
      <div className="lg:col-span-4 px-6 sm:px-10 py-10 lg:border-r border-[#EDEAE2]/10">
        <h2
          id="education-title"
          className="font-serif text-3xl tracking-[-0.02em] text-[#EDEAE2]"
        >
          {t("title")}
        </h2>
      </div>

      <div className="lg:col-span-8 divide-y divide-[#EDEAE2]/10">
        {educationExperience.map((edu, index) => (
          <div key={index} className="px-6 sm:px-10 py-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <GraduationCap
                  className="w-5 h-5 text-[#FF4D00] mt-1 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-serif text-2xl text-[#EDEAE2]">
                    {edu.degree}
                  </h3>
                  <p className="font-mono text-xs text-[#9A968E] mt-1">
                    {edu.institution}
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs text-[#9A968E] tabular-nums pl-9 sm:pl-0">
                {edu.period}
              </span>
            </div>

            <div className="pl-0 sm:pl-9 space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-[#9A968E] uppercase tabular-nums">
                  <span>{t("cycleLabel")}</span>
                  <span className="text-[#FF4D00]">2023 — 2026</span>
                </div>
                <div className="h-1 w-full bg-[#EDEAE2]/10 overflow-hidden">
                  <div
                    data-edu-bar
                    style={{ transform: "scaleX(0.95)" }}
                    className="h-full w-full bg-[#FF4D00] origin-left"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#636059]">
                  {t("focusLabel")}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {focusAreas.map((area) => (
                    <span
                      key={area}
                      className="px-2.5 py-1 border border-[#EDEAE2]/12 bg-[#0F1013] font-mono text-[11px] text-[#EDEAE2]/85"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
