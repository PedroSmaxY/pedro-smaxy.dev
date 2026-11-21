"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { LanguageSwitcher } from "../language-switcher";
import { ScrollProgress } from "../scroll-progress";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { PORTFOLIO_CONFIG } from "@/lib/config";

const NAV_LINKS = [
  { href: "#about", id: "about", key: "about" },
  { href: "#experience", id: "experience", key: "experiences" },
  { href: "#projects", id: "projects", key: "projects" },
  { href: "#skills", id: "skills", key: "skills" },
  { href: "#contact", id: "contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("portfolio.header");
  const { shortName, coordinates } = PORTFOLIO_CONFIG.personal;
  const [activeId, setActiveId] = useState<string>("");
  const clickLockUntilRef = useRef<number>(0);

  useEffect(() => {
    let rafId = 0;

    const updateActiveSection = () => {
      if (Date.now() < clickLockUntilRef.current) return;

      if (window.scrollY < 100) {
        setActiveId("");
        return;
      }

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40
      ) {
        setActiveId(NAV_LINKS[NAV_LINKS.length - 1].id);
        return;
      }

      let current = "";
      for (const item of NAV_LINKS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 140) {
          current = item.id;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleNavClick = (id: string) => {
    clickLockUntilRef.current = Date.now() + 750;
    setActiveId(id);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A0B0D]/90 backdrop-blur-md border-b border-[#EDEAE2]/10">
      <div className="px-6 sm:px-10 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a
            href="#home"
            onClick={() => handleNavClick("")}
            className="font-serif text-2xl tracking-tight text-[#EDEAE2] hover:text-[#FF8A4C] transition-colors"
          >
            {shortName}
          </a>
          <span className="hidden md:inline font-mono text-[11px] text-[#9A968E] border-l border-[#EDEAE2]/15 pl-4 tabular-nums">
            {coordinates} · PETRÓPOLIS
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-7 font-mono text-xs text-[#9A968E]">
          {NAV_LINKS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.key}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? "location" : undefined}
                className={`relative py-1 transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-[#FF4D00] after:transition-transform after:duration-200 ${
                  isActive
                    ? "text-[#EDEAE2] after:origin-left after:scale-x-100"
                    : "hover:text-[#EDEAE2] after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100"
                }`}
              >
                {t(`navItems.${item.key}`)}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-[#9A968E] hover:text-[#EDEAE2] hover:bg-[#EDEAE2]/10 data-[state=open]:bg-[#EDEAE2]/[0.06] data-[state=open]:text-[#EDEAE2] data-[state=open]:border-[#EDEAE2]/15 border border-transparent rounded-none"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-56 p-0 bg-[#0A0B0D] border-[#EDEAE2]/15 text-[#EDEAE2] rounded-none shadow-2xl lg:hidden"
            >
              <div
                aria-hidden="true"
                className="flex items-center justify-between px-3.5 py-2 border-b border-[#EDEAE2]/10 bg-[#0F1013] font-mono text-[10px] tracking-widest text-[#636059] tabular-nums"
              >
                <span>NAV // INDEX</span>
                <span>{String(NAV_LINKS.length).padStart(2, "0")}</span>
              </div>
              <div className="divide-y divide-[#EDEAE2]/10">
                {NAV_LINKS.map((item, idx) => {
                  const isActive = activeId === item.id;
                  const indexCode = String(idx + 1).padStart(2, "0");
                  return (
                    <DropdownMenuItem key={item.key} asChild>
                      <a
                        href={item.href}
                        onClick={() => handleNavClick(item.id)}
                        aria-current={isActive ? "location" : undefined}
                        className={`cursor-pointer rounded-none font-mono text-xs pr-3.5 pl-3 py-3.5 flex items-center justify-between gap-3 transition-colors outline-none focus:bg-[#FF4D00]/12 focus:text-[#EDEAE2] data-[highlighted]:bg-[#FF4D00]/12 data-[highlighted]:text-[#EDEAE2] border-l-2 ${
                          isActive
                            ? "text-[#EDEAE2] bg-[#EDEAE2]/[0.04] border-[#FF4D00]"
                            : "text-[#9A968E] border-transparent"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            aria-hidden="true"
                            className={`text-[10px] tabular-nums ${
                              isActive ? "text-[#FF4D00]" : "text-[#636059]"
                            }`}
                          >
                            {indexCode}
                          </span>
                          <span>{t(`navItems.${item.key}`)}</span>
                        </span>
                        {isActive ? (
                          <span
                            aria-hidden="true"
                            className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]"
                          />
                        ) : null}
                      </a>
                    </DropdownMenuItem>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
