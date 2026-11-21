"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { PORTFOLIO_CONFIG } from "@/lib/config";
import { BlackHoleCanvas } from "@/components/black-hole-canvas";
import { GravitationalGrid } from "@/components/gravitational-grid";
import { createMotionScope, gsap, MOTION } from "@/lib/motion";

export function Hero() {
  const t = useTranslations("portfolio.hero");
  const locale = useLocale();
  const { cvDownloadUrl, cvDownloadUrlEn } = PORTFOLIO_CONFIG.links;
  const activeCvUrl = locale === "en" ? cvDownloadUrlEn : cvDownloadUrl;
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    return createMotionScope(rootRef.current, ({ reduceMotion }) => {
      if (reduceMotion) return;

      const tl = gsap.timeline({ defaults: { ease: MOTION.ease } });

      tl.fromTo(
        "[data-hero-headline]",
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.56,
          clearProps: "transform",
        }
      )
        .fromTo(
          "[data-hero-emphasis]",
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.56,
            clearProps: "transform",
          },
          0.06
        )
        .fromTo(
          "[data-hero-instrument]",
          { y: 10, autoAlpha: 0.35 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.52,
            clearProps: "transform,opacity,visibility",
          },
          0.04
        )
        .fromTo(
          ["[data-hero-meta]", "[data-hero-desc]", "[data-hero-cta]"],
          { y: 10, autoAlpha: 0.01 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.44,
            stagger: 0.05,
            clearProps: "transform,opacity,visibility",
          },
          0.1
        )
        .fromTo(
          "[data-bh-cell]",
          { y: 8, autoAlpha: 0.01 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.36,
            stagger: 0.04,
            clearProps: "transform,opacity,visibility",
          },
          0.18
        );
    });
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="grid lg:grid-cols-12 border-b border-[#EDEAE2]/10"
    >
      <div className="relative overflow-hidden lg:col-span-7 px-6 sm:px-10 py-14 sm:py-20 flex flex-col justify-between gap-10 lg:border-r border-[#EDEAE2]/10">
        <GravitationalGrid />
        <div className="relative z-10 space-y-6">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-[4.25rem] leading-[0.98] tracking-[-0.025em] font-normal text-[#EDEAE2]">
            <span className="inline-block overflow-hidden align-bottom pb-1 -mb-1">
              <span data-hero-headline className="inline-block">
                {t("headlinePrefix")}
              </span>
            </span>{" "}
            <span className="inline-block overflow-hidden align-bottom pb-1 -mb-1 pr-1">
              <em
                data-hero-emphasis
                className="inline-block italic text-[#FF8A4C]"
              >
                {t("headlineEmphasis")}
              </em>
            </span>
          </h1>

          <div
            data-hero-meta
            className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-[#9A968E]"
          >
            <span className="inline-flex items-center gap-2 text-[#EDEAE2]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
              {t("role")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#FF4D00]" />
              {t("location")}
            </span>
          </div>

          <p
            data-hero-desc
            className="text-[#9A968E] text-base sm:text-lg leading-relaxed max-w-[65ch]"
          >
            {t("description")}
          </p>
        </div>

        <div
          data-hero-cta
          className="relative z-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2"
        >
          <a
            href={activeCvUrl}
            download
            className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-6 py-3 bg-[#FF4D00] hover:bg-[#ff621f] text-[#0A0B0D] font-mono text-xs font-bold tracking-wider uppercase transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            {t("downloadLabel")}
          </a>
          <a
            href="#projects"
            className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-6 py-3 border border-[#EDEAE2]/20 hover:border-[#EDEAE2] text-[#EDEAE2] font-mono text-xs tracking-wider uppercase transition-colors group"
          >
            {t("projectsLabel")}
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      <div data-hero-instrument className="lg:col-span-5">
        <BlackHoleCanvas
          title={t("instrumentTitle")}
          hint={t("instrumentHint")}
          hintTouch={t("instrumentHintTouch")}
        />
      </div>
    </section>
  );
}
