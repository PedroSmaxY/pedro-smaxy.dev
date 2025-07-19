import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "../language-switcher";
import { PORTFOLIO_CONFIG } from "@/lib/config";

export function Header() {
  const t = useTranslations("portfolio.header");

  const { shortName } = PORTFOLIO_CONFIG.personal;

  return (
    <header>
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-purple-900/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              {shortName}
            </div>
            <div className="hidden lg:flex space-x-8">
              <a
                href="#home"
                className="hover:text-purple-400 transition-colors"
              >
                {t("navItems.home")}
              </a>
              <a
                href="#about"
                className="hover:text-purple-400 transition-colors"
              >
                {t("navItems.about")}
              </a>
              <a
                href="#experience"
                className="hover:text-purple-400 transition-colors"
              >
                {t("navItems.experiences")}
              </a>
              <a
                href="#projects"
                className="hover:text-purple-400 transition-colors"
              >
                {t("navItems.projects")}
              </a>
              <a
                href="#skills"
                className="hover:text-purple-400 transition-colors"
              >
                {t("navItems.skills")}
              </a>
              <a
                href="#contact"
                className="hover:text-purple-400 transition-colors"
              >
                {t("navItems.contact")}
              </a>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}
