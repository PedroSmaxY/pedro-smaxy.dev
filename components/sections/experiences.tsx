"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { createMotionScope, gsap, MOTION } from "@/lib/motion";

export type Experience = {
  company: string;
  position: string;
  period: string;
  location: string;
  description: string[];
};

export function Experiences() {
  const t = useTranslations("portfolio.experiences");
  const rootRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const experiences = t.raw("items") as Experience[];

  useEffect(() => {
    return createMotionScope(rootRef.current, ({ reduceMotion }) => {
      if (reduceMotion) return;

      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 65%",
              end: "bottom 75%",
              scrub: true,
            },
          }
        );
      }

      gsap.from("[data-exp-item]", {
        y: 16,
        autoAlpha: 0,
        duration: MOTION.duration.enter,
        stagger: MOTION.stagger,
        ease: MOTION.ease,
        clearProps: "transform,opacity,visibility",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          once: true,
        },
      });
    });
  }, []);

  return (
    <section
      id="experience"
      ref={rootRef}
      className="grid lg:grid-cols-12 border-b border-[#EDEAE2]/10"
    >
      <div className="lg:col-span-4 px-6 sm:px-10 py-12 lg:border-r border-[#EDEAE2]/10">
        <h2 className="font-serif text-3xl sm:text-4xl tracking-[-0.02em] text-[#EDEAE2] lg:sticky lg:top-24">
          {t("title")}
        </h2>
      </div>

      <div className="lg:col-span-8 relative">
        <div
          aria-hidden="true"
          className="hidden sm:block absolute left-10 top-12 bottom-12 w-px bg-[#EDEAE2]/10"
        >
          <div
            ref={progressRef}
            className="w-full h-full bg-[#FF4D00] origin-top"
          />
        </div>

        <div className="divide-y divide-[#EDEAE2]/10">
          {experiences.map((exp, index) => (
            <article
              key={`${exp.company}-${index}`}
              data-exp-item
              className="px-6 sm:pl-20 sm:pr-10 py-10 relative"
            >
              <span
                aria-hidden="true"
                className="hidden sm:block absolute left-[37px] top-12 w-[7px] h-[7px] bg-[#0A0B0D] border border-[#FF4D00]"
              />

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-serif text-2xl text-[#EDEAE2]">
                    {exp.position}
                  </h3>
                  <p className="font-mono text-xs text-[#FF8A4C] mt-0.5">
                    {exp.company}
                  </p>
                </div>
                <div className="font-mono text-xs text-[#9A968E] sm:text-right tabular-nums">
                  <p>{exp.period}</p>
                  <p className="text-[#636059]">{exp.location}</p>
                </div>
              </div>

              <ul className="space-y-2 max-w-[65ch]">
                {exp.description.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="text-sm text-[#9A968E] leading-relaxed flex gap-3"
                  >
                    <span className="font-mono text-[#FF4D00] select-none">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
