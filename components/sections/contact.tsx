"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { PORTFOLIO_CONFIG } from "@/lib/config";
import { createMotionScope, gsap } from "@/lib/motion";

export function Contact() {
  const t = useTranslations("portfolio.contact");
  const { linkedinUrl, githubUrl } = PORTFOLIO_CONFIG.links;
  const { email, coordinates } = PORTFOLIO_CONFIG.personal;
  const [copied, setCopied] = useState(false);
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
      });
    });
  }, []);

  return (
    <section
      id="contact"
      ref={rootRef}
      className="grid lg:grid-cols-12 border-b border-[#EDEAE2]/10"
    >
      <div className="lg:col-span-7 px-6 sm:px-10 py-14 sm:py-16 lg:border-r border-[#EDEAE2]/10 dot-matrix space-y-6">
        <h2 className="font-serif text-4xl sm:text-5xl tracking-[-0.02em] text-[#EDEAE2]">
          {t("title")}
        </h2>
        <p className="text-base sm:text-lg text-[#9A968E] leading-relaxed max-w-[55ch]">
          {t("subtitle")}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            data-magnet
            onClick={handleCopy}
            className="inline-flex items-center px-6 py-3 bg-[#FF4D00] hover:bg-[#ff621f] text-[#0A0B0D] font-mono text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
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
            className="inline-flex items-center px-5 py-3 border border-[#EDEAE2]/20 hover:border-[#EDEAE2] text-[#EDEAE2] font-mono text-xs tracking-wider uppercase transition-colors"
          >
            <span data-magnet-inner className="inline-flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" />
              {t("sendEmailLabel")}
            </span>
          </a>
        </div>
      </div>

      <div className="lg:col-span-5 px-6 sm:px-10 py-12 sm:py-16 bg-[#0F1013] flex flex-col justify-between gap-8">
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
            {coordinates} · 43.1729° W
          </p>
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
