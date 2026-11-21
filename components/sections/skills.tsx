"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { getSkillIcon } from "@/lib/get-skill-icon";
import { PORTFOLIO_CONFIG } from "@/lib/config";
import { createMotionScope, gsap, MOTION } from "@/lib/motion";

const CATEGORY_META: Record<string, { code: string; appliedIn: string }> = {
  systems: {
    code: "01 // SYS_CORE",
    appliedIn: "BLACK HOLE · SOLAR SYSTEM",
  },
  ai: {
    code: "02 // AI_MCP",
    appliedIn: "ABNT MCP · SDD · AGENTS",
  },
  backend: {
    code: "03 // BACKEND",
    appliedIn: "FINAI · FURIA API · RAILS",
  },
  frontend: {
    code: "04 // PRODUCT",
    appliedIn: "FINAI · FURIA FANBOT",
  },
  devops: {
    code: "05 // INFRA",
    appliedIn: "DOCKER · CI/CD · VERCEL",
  },
};

export function Skills() {
  const t = useTranslations("portfolio.skills");
  const categories = PORTFOLIO_CONFIG.skillCategories;
  const categoryTitles = t.raw("categoryTitles") as Record<string, string>;
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    return createMotionScope(rootRef.current, ({ reduceMotion }) => {
      if (reduceMotion) return;

      gsap.fromTo(
        "[data-skill-col]",
        { y: 14, autoAlpha: 0.72 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.48,
          stagger: 0.055,
          ease: MOTION.ease,
          clearProps: "transform,opacity,visibility",
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
      id="skills"
      ref={rootRef}
      className="border-b border-[#EDEAE2]/10"
    >
      <div className="px-6 sm:px-10 py-8 border-b border-[#EDEAE2]/10">
        <h2 className="font-serif text-3xl sm:text-4xl tracking-[-0.02em] text-[#EDEAE2]">
          {t("title")}
        </h2>
      </div>

      <div
        className="grid sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#EDEAE2]/10"
        onMouseLeave={() => setHoveredKey(null)}
      >
        {Object.entries(categories).map(([key, items]) => {
          const isFocused = hoveredKey === key;
          const isDimmed = hoveredKey !== null && !isFocused;
          const meta = CATEGORY_META[key] ?? {
            code: "00 // MODULE",
            appliedIn: "SYSTEMS",
          };

          return (
            <div
              key={key}
              data-skill-col
              tabIndex={0}
              onMouseEnter={() => setHoveredKey(key)}
              onFocus={() => setHoveredKey(key)}
              onBlur={() => setHoveredKey(null)}
              className={`relative p-6 sm:p-7 flex flex-col justify-between gap-6 transition-all duration-200 focus-visible:outline-none focus-visible:bg-[#0F1013] ${
                isFocused
                  ? "bg-[#0F1013] opacity-100"
                  : isDimmed
                  ? "opacity-55"
                  : "opacity-100"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute top-0 left-0 right-0 h-px bg-[#FF4D00] transition-opacity duration-200 ${
                  isFocused ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-[10px] text-[#636059] tracking-wider tabular-nums">
                  <span>{meta.code}</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      isFocused ? "bg-[#FF4D00]" : "bg-[#EDEAE2]/20"
                    }`}
                    aria-hidden="true"
                  />
                </div>

                <div className="flex items-center gap-2.5 text-[#FF4D00]">
                  {getSkillIcon(key, "h-4 w-4 shrink-0")}
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#EDEAE2]">
                    {categoryTitles[key]}
                  </h3>
                </div>

                <ul className="space-y-2">
                  {items.map((item, itemIdx) => (
                    <li
                      key={item}
                      className={`text-sm font-mono leading-snug transition-colors flex items-center gap-2 ${
                        itemIdx === 0
                          ? "text-[#EDEAE2]"
                          : isFocused
                          ? "text-[#EDEAE2]"
                          : "text-[#9A968E]"
                      }`}
                    >
                      {itemIdx === 0 ? (
                        <span
                          aria-hidden="true"
                          className="w-1 h-1 bg-[#FF4D00] shrink-0"
                        />
                      ) : null}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p
                className={`pt-3 border-t border-[#EDEAE2]/10 font-mono text-[10px] tracking-wider transition-colors ${
                  isFocused ? "text-[#FF8A4C]" : "text-[#636059]"
                }`}
              >
                → {meta.appliedIn}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
