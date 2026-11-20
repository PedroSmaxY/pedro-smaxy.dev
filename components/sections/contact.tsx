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
  const { email } = PORTFOLIO_CONFIG.personal;
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);

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
      className="px-6 sm:px-10 py-16 sm:py-20 dot-matrix border-b border-[#EDEAE2]/10"
    >
      <div className="max-w-3xl space-y-6">
        <h2 className="font-serif text-4xl sm:text-5xl tracking-[-0.02em] text-[#EDEAE2]">
          {t("title")}
        </h2>
        <p className="text-base sm:text-lg text-[#9A968E] leading-relaxed max-w-[60ch]">
          {t("subtitle")}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-4">
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

          <a
            data-magnet
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-3 border border-[#EDEAE2]/20 hover:border-[#EDEAE2] text-[#EDEAE2] font-mono text-xs tracking-wider uppercase transition-colors"
          >
            <span data-magnet-inner className="inline-flex items-center gap-2">
              <LinkedinLogoIcon className="h-4 w-4" />
              LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5 text-[#9A968E]" />
            </span>
          </a>

          <a
            data-magnet
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-3 border border-[#EDEAE2]/20 hover:border-[#EDEAE2] text-[#EDEAE2] font-mono text-xs tracking-wider uppercase transition-colors"
          >
            <span data-magnet-inner className="inline-flex items-center gap-2">
              <GithubLogoIcon className="h-4 w-4" />
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5 text-[#9A968E]" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
