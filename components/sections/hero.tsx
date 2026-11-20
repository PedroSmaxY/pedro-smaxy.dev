"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { PORTFOLIO_CONFIG } from "@/lib/config";
import { BlackHoleCanvas } from "@/components/black-hole-canvas";
import { createMotionScope, gsap, MOTION } from "@/lib/motion";

export function Hero() {
  const t = useTranslations("portfolio.hero");
  const rootRef = useRef<HTMLElement | null>(null);
  const { cvDownloadUrl } = PORTFOLIO_CONFIG.links;

  useEffect(() => {
    return createMotionScope(rootRef.current, ({ reduceMotion }) => {
      if (reduceMotion) return;

      gsap.from("[data-hero-reveal]", {
        y: 20,
        autoAlpha: 0,
        duration: MOTION.duration.enter,
        stagger: MOTION.stagger,
        ease: MOTION.ease,
        clearProps: "transform,opacity,visibility",
      });
    });
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="grid lg:grid-cols-12 border-b border-[#EDEAE2]/10"
    >
      <div className="lg:col-span-7 px-6 sm:px-10 py-14 sm:py-20 flex flex-col justify-between gap-10 lg:border-r border-[#EDEAE2]/10 dot-matrix">
        <div className="space-y-6">
          <h1
            data-hero-reveal
            className="font-serif text-5xl sm:text-6xl lg:text-[4.25rem] leading-[0.98] tracking-[-0.025em] font-normal text-[#EDEAE2]"
          >
            {t("headlinePrefix")}{" "}
            <em className="italic text-[#FF8A4C]">{t("headlineEmphasis")}</em>
          </h1>

          <div
            data-hero-reveal
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
            data-hero-reveal
            className="text-[#9A968E] text-base sm:text-lg leading-relaxed max-w-[65ch]"
          >
            {t("description")}
          </p>
        </div>

        <div data-hero-reveal className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href={cvDownloadUrl}
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF4D00] hover:bg-[#ff621f] text-[#0A0B0D] font-mono text-xs font-bold tracking-wider uppercase transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            {t("downloadLabel")}
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#EDEAE2]/20 hover:border-[#EDEAE2] text-[#EDEAE2] font-mono text-xs tracking-wider uppercase transition-colors group"
          >
            {t("projectsLabel")}
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      <div className="lg:col-span-5">
        <BlackHoleCanvas
          title={t("instrumentTitle")}
          hint={t("instrumentHint")}
        />
      </div>
    </section>
  );
}
