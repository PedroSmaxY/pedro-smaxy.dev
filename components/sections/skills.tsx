"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { getSkillIcon } from "@/lib/get-skill-icon";
import { PORTFOLIO_CONFIG } from "@/lib/config";

export function Skills() {
  const t = useTranslations("portfolio.skills");
  const categories = PORTFOLIO_CONFIG.skillCategories;
  const categoryTitles = t.raw("categoryTitles") as Record<string, string>;
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <section id="skills" className="border-b border-[#EDEAE2]/10">
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

          return (
            <div
              key={key}
              onMouseEnter={() => setHoveredKey(key)}
              className={`relative p-6 sm:p-7 space-y-4 transition-all duration-200 ${
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
              <div className="flex items-center gap-2.5 text-[#FF4D00]">
                {getSkillIcon(key, "h-4 w-4 shrink-0")}
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#EDEAE2]">
                  {categoryTitles[key]}
                </h3>
              </div>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className={`text-sm font-mono leading-snug transition-colors ${
                      isFocused ? "text-[#EDEAE2]" : "text-[#9A968E]"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
