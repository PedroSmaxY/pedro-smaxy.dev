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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "[data-about-portrait]",
          start: "top 85%",
          once: true,
        },
      });

      tl.from("[data-about-portrait]", {
        clipPath: "inset(0 0 100% 0)",
        autoAlpha: 0,
        duration: 0.85,
        ease: MOTION.ease,
        clearProps: "clipPath,opacity,visibility",
      }).from(
        "[data-about-img]",
        {
          scale: 1.08,
          duration: 0.95,
          ease: MOTION.ease,
          clearProps: "transform",
        },
        0
      );
    });
  }, []);

  return (
    <section
      id="about"
      ref={rootRef}
      className="grid lg:grid-cols-12 border-b border-[#EDEAE2]/10"
    >
      <div className="lg:col-span-4 px-6 sm:px-10 py-12 lg:border-r border-[#EDEAE2]/10 flex flex-col justify-between gap-8">
        <div className="space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl leading-tight tracking-[-0.02em] text-[#EDEAE2]">
            {t("title")}
          </h2>

          <div
            data-about-portrait
            className="relative w-44 sm:w-52 aspect-square border border-[#EDEAE2]/15 bg-[#0F1013] p-1.5 overflow-hidden"
          >
            <Image
              data-about-img
              src={profileImageUrl}
              alt={`${name} — Portrait`}
              width={240}
              height={240}
              className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-[#EDEAE2]/10 font-mono text-xs text-[#9A968E] space-y-2">
          <div className="flex justify-between gap-4">
            <span>{t("educationLabel")}</span>
            <span className="text-[#EDEAE2] text-right">
              Ciência da Computação (UVA)
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span>{t("roleLabel")}</span>
            <span className="text-[#EDEAE2] text-right">Salto Consultoria</span>
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
