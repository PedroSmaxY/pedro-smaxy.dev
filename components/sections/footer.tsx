import { useTranslations } from "next-intl";
import { PORTFOLIO_CONFIG } from "@/lib/config";

export function Footer() {
  const t = useTranslations("portfolio.footer");
  const { name, coordinates } = PORTFOLIO_CONFIG.personal;

  return (
    <footer className="px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-[#9A968E]">
      <p suppressHydrationWarning>
        © {new Date().getFullYear()} {name}. {t("license")}
      </p>
      <span className="text-[#636059] tabular-nums">
        {coordinates} · RELATIVISTIC MONOGRAPH
      </span>
    </footer>
  );
}
