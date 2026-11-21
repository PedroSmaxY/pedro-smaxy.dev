"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { PORTFOLIO_CONFIG } from "@/lib/config";
import { GravitationalGrid } from "@/components/gravitational-grid";
import { createMotionScope, gsap, MOTION } from "@/lib/motion";

export function Contact() {
  const t = useTranslations("portfolio.contact");
  const { linkedinUrl, githubUrl } = PORTFOLIO_CONFIG.links;
  const { email, coordinates } = PORTFOLIO_CONFIG.personal;
  const [copied, setCopied] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [rioTime, setRioTime] = useState<string>("--:--:--");
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date());
        setRioTime(formatted);
      } catch {
        setRioTime("BRT");
      }
    };
    updateClock();
    const id = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(id);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  useEffect(() => {
    return createMotionScope(rootRef.current, ({ reduceMotion }) => {
      if (reduceMotion) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;

      const magnets =
        rootRef.current?.querySelectorAll<HTMLElement>("[data-magnet]") ?? [];
      const cleanups: Array<() => void> = [];

      magnets.forEach((el) => {
        const inner = el.querySelector<HTMLElement>("[data-magnet-inner]");
        if (!inner) return;

        const xTo = gsap.quickTo(inner, "x", {
          duration: 0.25,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(inner, "y", {
          duration: 0.25,
          ease: "power3.out",
        });

        const onMove = (e: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.12;
          const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.12;
          xTo(Math.max(-5, Math.min(5, dx)));
          yTo(Math.max(-5, Math.min(5, dy)));
        };

        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        });
      });

      const geoCard =
        rootRef.current?.querySelector<HTMLElement>("[data-geo-card]");
      const geoSvg = geoCard?.querySelector<SVGSVGElement>("svg");
      const geoCore = geoCard?.querySelector<SVGGElement>("[data-geo-core]");
      if (geoCard && geoSvg && geoCore) {
        const gxTo = gsap.quickTo(geoCore, "x", {
          duration: 0.35,
          ease: MOTION.ease,
        });
        const gyTo = gsap.quickTo(geoCore, "y", {
          duration: 0.35,
          ease: MOTION.ease,
        });

        const onGeoMove = (e: PointerEvent) => {
          const svgRect = geoSvg.getBoundingClientRect();
          const scale = Math.min(svgRect.width / 260, svgRect.height / 72);
          const viewOffsetX = (svgRect.width - 260 * scale) / 2;
          const viewOffsetY = (svgRect.height - 72 * scale) / 2;
          const centerX = svgRect.left + viewOffsetX + 56 * scale;
          const centerY = svgRect.top + viewOffsetY + 36 * scale;
          const dx = e.clientX - centerX;
          const dy = e.clientY - centerY;
          const dist = Math.hypot(dx, dy);

          if (dist > 0.001) {
            const offset = Math.min(1, dist / 72) * 5;
            gxTo((dx / dist) * offset);
            gyTo((dy / dist) * offset);
          } else {
            gxTo(0);
            gyTo(0);
          }
          setIsTracking((prev) => (prev ? prev : true));
        };

        const onGeoLeave = () => {
          gxTo(0);
          gyTo(0);
          setIsTracking(false);
        };

        geoCard.addEventListener("pointermove", onGeoMove);
        geoCard.addEventListener("pointerleave", onGeoLeave);
        cleanups.push(() => {
          geoCard.removeEventListener("pointermove", onGeoMove);
          geoCard.removeEventListener("pointerleave", onGeoLeave);
        });
      }

      return () => {
        cleanups.forEach((fn) => fn());
      };
    });
  }, []);

  return (
    <section
      id="contact"
      ref={rootRef}
      className="grid lg:grid-cols-12 border-b border-[#EDEAE2]/10"
    >
      <div className="relative overflow-hidden lg:col-span-7 px-6 sm:px-10 py-14 sm:py-16 lg:border-r border-[#EDEAE2]/10 space-y-6">
        <GravitationalGrid />
        <h2 className="relative z-10 font-serif text-4xl sm:text-5xl tracking-[-0.02em] text-[#EDEAE2]">
          {t("title")}
        </h2>
        <p className="relative z-10 text-base sm:text-lg text-[#9A968E] leading-relaxed max-w-[55ch]">
          {t("subtitle")}
        </p>

        <div className="relative z-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-2">
          <button
            type="button"
            data-magnet
            onClick={handleCopy}
            className="w-full sm:w-auto justify-center inline-flex items-center px-6 py-3 bg-[#FF4D00] hover:bg-[#ff621f] text-[#0A0B0D] font-mono text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
          >
            <span
              data-magnet-inner
              className="inline-flex items-center gap-2.5"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              <span>{copied ? t("copiedLabel") : email}</span>
            </span>
          </button>

          <a
            data-magnet
            href={`mailto:${email}`}
            className="w-full sm:w-auto justify-center inline-flex items-center px-5 py-3 border border-[#EDEAE2]/20 hover:border-[#EDEAE2] text-[#EDEAE2] font-mono text-xs tracking-wider uppercase transition-colors"
          >
            <span data-magnet-inner className="inline-flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" />
              {t("sendEmailLabel")}
            </span>
          </a>
        </div>
      </div>

      <div className="lg:col-span-5 px-6 sm:px-10 py-12 sm:py-16 bg-[#0F1013] flex flex-col justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between font-mono text-xs text-[#9A968E] pb-3 border-b border-[#EDEAE2]/10">
            <span>{t("localTimeLabel")}</span>
            <span className="text-[#EDEAE2] tabular-nums" suppressHydrationWarning>
              {rioTime} BRT
            </span>
          </div>
          <div className="flex items-center gap-2.5 font-mono text-xs text-[#EDEAE2]">
            <span className="w-2 h-2 rounded-full bg-[#FF4D00]" />
            <span>{t("availabilityLabel")}</span>
          </div>
          <p className="font-mono text-[11px] text-[#636059] tabular-nums">
            {coordinates} · 43.1331° W
          </p>
        </div>

        <div
          data-geo-card
          className="border border-[#EDEAE2]/12 bg-[#0A0B0D] p-3.5 transition-colors hover:border-[#EDEAE2]/22 cursor-crosshair select-none"
        >
          <div className="flex items-center justify-between font-mono text-[9px] text-[#636059] uppercase tracking-wider mb-2">
            <span>GEO // TELEMETRY_LOCK</span>
            <span className="text-[#FF4D00]">UTC-3</span>
          </div>
          <svg
            viewBox="0 0 260 72"
            className="w-full h-20"
            aria-hidden="true"
          >
            <line x1="14" y1="36" x2="98" y2="36" stroke="#EDEAE2" strokeOpacity="0.16" strokeDasharray="2 3" />
            <line x1="56" y1="2" x2="56" y2="70" stroke="#EDEAE2" strokeOpacity="0.16" strokeDasharray="2 3" />
            <circle
              cx="56"
              cy="36"
              r="24"
              fill="none"
              stroke="#EDEAE2"
              strokeOpacity="0.18"
              strokeWidth="1"
              strokeDasharray="3 4"
              style={{ transformOrigin: "56px 36px" }}
              className="animate-[orbitSlow_36s_linear_infinite] motion-reduce:animate-none"
            />
            <circle cx="56" cy="36" r="34" fill="none" stroke="#EDEAE2" strokeOpacity="0.09" strokeWidth="1" />
            <g data-geo-core>
              <circle cx="56" cy="36" r="12" fill="none" stroke="#FF4D00" strokeOpacity="0.6" strokeWidth="1" />
              <circle cx="56" cy="36" r="2.5" fill="#FF4D00" />
            </g>
            <text x="124" y="25" className="fill-[#EDEAE2] font-mono text-[9px]">
              LAT: -22.3886° S
            </text>
            <text x="124" y="40" className="fill-[#9A968E] font-mono text-[9px]">
              LON: -43.1331° W
            </text>
            <text x="124" y="55" className="fill-[#FF8A4C] font-mono text-[8.5px]">
              {isTracking ? "SIGNAL: TRACKING · BR-RJ" : "SIGNAL: NOMINAL · BR-RJ"}
            </text>
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <a
            data-magnet
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between px-4 py-3 border border-[#EDEAE2]/15 hover:border-[#FF4D00] text-[#EDEAE2] font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <span data-magnet-inner className="inline-flex items-center gap-2">
              <LinkedinLogoIcon className="h-4 w-4" />
              LinkedIn
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#FF4D00]" />
          </a>

          <a
            data-magnet
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between px-4 py-3 border border-[#EDEAE2]/15 hover:border-[#FF4D00] text-[#EDEAE2] font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <span data-magnet-inner className="inline-flex items-center gap-2">
              <GithubLogoIcon className="h-4 w-4" />
              GitHub
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#FF4D00]" />
          </a>
        </div>
      </div>
    </section>
  );
}
