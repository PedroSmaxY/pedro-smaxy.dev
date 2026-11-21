"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { PORTFOLIO_CONFIG } from "@/lib/config";
import { createMotionScope, gsap, MOTION } from "@/lib/motion";

export function About() {
  const t = useTranslations("portfolio.about");
  const rootRef = useRef<HTMLElement | null>(null);
  const { name } = PORTFOLIO_CONFIG.personal;
  const { profileImageUrl } = PORTFOLIO_CONFIG.links;
  const badges = PORTFOLIO_CONFIG.technologies.mainBadges;
  const paragraphs = t.raw("paragraphs") as string[];

  useEffect(() => {
    return createMotionScope(rootRef.current, ({ reduceMotion }) => {
      if (reduceMotion) return;

      gsap.fromTo(
        "[data-about-reveal]",
        { scale: 1.06 },
        {
          scale: 1,
          duration: 0.9,
          ease: MOTION.ease,
          clearProps: "transform",
          scrollTrigger: {
            trigger: "[data-about-portrait]",
            start: "top 95%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="about"
      ref={rootRef}
      className="grid lg:grid-cols-12 border-b border-[#EDEAE2]/10"
    >
      <div className="lg:col-span-4 px-6 sm:px-10 py-10 sm:py-12 border-b lg:border-b-0 lg:border-r border-[#EDEAE2]/10 flex flex-col justify-between gap-6 lg:gap-8">
        <h2 className="font-serif text-3xl sm:text-4xl leading-tight tracking-[-0.02em] text-[#EDEAE2]">
          {t("title")}
        </h2>

        <div className="grid grid-cols-[128px_1fr] sm:grid-cols-[176px_1fr] lg:grid-cols-1 gap-5 lg:gap-8 items-end">
          <div
            data-about-portrait
            className="relative w-32 sm:w-44 lg:w-52 border border-[#EDEAE2]/15 bg-[#0F1013] flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-[#EDEAE2]/10 font-mono text-[9px] tracking-wider text-[#9A968E] uppercase whitespace-nowrap">
              <span>IMG_01 // PORTRAIT</span>
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] shrink-0"
                aria-hidden="true"
              />
            </div>

            <div
              data-about-reveal
              className="relative aspect-[4/5] w-full overflow-hidden bg-[#0A0B0D]"
            >
              <Image
                src={profileImageUrl}
                alt={`${name} — Portrait`}
                fill
                priority
                sizes="(max-width: 640px) 128px, (max-width: 1024px) 176px, 208px"
                className="object-cover object-[50%_22%] scale-[1.03] grayscale contrast-110 hover:grayscale-0 transition-[filter] duration-500"
              />
            </div>
          </div>

          <div className="pt-4 lg:pt-6 border-t border-[#EDEAE2]/10 font-mono text-xs text-[#9A968E] space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-4">
              <span>{t("educationLabel")}</span>
              <span className="text-[#EDEAE2] sm:text-right">
                {t("educationValue")}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-4">
              <span>{t("roleLabel")}</span>
              <span className="text-[#EDEAE2] sm:text-right">
                {t("roleValue")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 px-6 sm:px-10 py-12 flex flex-col justify-center gap-8">
        <div className="space-y-5 max-w-[68ch]">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`leading-relaxed ${
                index === 0
                  ? "text-base sm:text-lg text-[#EDEAE2]/90"
                  : "text-sm sm:text-base text-[#9A968E]"
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-[#EDEAE2]/10">
          {badges.map((badge) => (
            <span
              key={badge}
              className="px-2.5 py-1 border border-[#EDEAE2]/12 bg-[#0F1013] font-mono text-xs text-[#EDEAE2]/85 hover:border-[#FF4D00]/60 transition-colors"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
