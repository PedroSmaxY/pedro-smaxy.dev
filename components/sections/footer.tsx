import { useTranslations } from "next-intl";
import { PORTFOLIO_CONFIG } from "@/lib/config";

export function Footer() {
  const t = useTranslations("portfolio.footer");
  const { name, coordinates } = PORTFOLIO_CONFIG.personal;

  return (
    <footer className="px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-[#9A968E]">
      <p className="text-center sm:text-left" suppressHydrationWarning>
        © {new Date().getFullYear()} {name}. {t("license")}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <span className="text-[#636059] tabular-nums whitespace-nowrap">
          {coordinates} · 43.1331° W
        </span>
        <a
          href="#home"
          className="px-2.5 py-1 border border-[#EDEAE2]/15 hover:border-[#FF4D00] text-[#EDEAE2] transition-colors whitespace-nowrap shrink-0"
        >
          [ ↑ TOP // 00 ]
        </a>
      </div>
    </footer>
  );
}
