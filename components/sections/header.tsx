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
  { href: "#about", key: "about" },
  { href: "#experience", key: "experiences" },
  { href: "#projects", key: "projects" },
  { href: "#skills", key: "skills" },
  { href: "#contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("portfolio.header");
  const { shortName, coordinates } = PORTFOLIO_CONFIG.personal;

  return (
    <header className="sticky top-0 z-50 bg-[#0A0B0D]/90 backdrop-blur-md border-b border-[#EDEAE2]/10">
      <div className="px-6 sm:px-10 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a
            href="#home"
            className="font-serif text-2xl tracking-tight text-[#EDEAE2] hover:text-[#FF8A4C] transition-colors"
          >
            {shortName}
          </a>
          <span className="hidden md:inline font-mono text-[11px] text-[#9A968E] border-l border-[#EDEAE2]/15 pl-4 tabular-nums">
            {coordinates} · RIO
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-7 font-mono text-xs text-[#9A968E]">
          {NAV_LINKS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="relative py-1 hover:text-[#EDEAE2] transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-[#FF4D00] after:transition-transform after:duration-200 hover:after:origin-left hover:after:scale-x-100"
            >
              {t(`navItems.${item.key}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-[#9A968E] hover:text-[#EDEAE2] hover:bg-[#EDEAE2]/10 rounded-none"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#0F1013] border-[#EDEAE2]/15 text-[#EDEAE2] rounded-none lg:hidden"
            >
              {NAV_LINKS.map((item) => (
                <DropdownMenuItem key={item.key} asChild>
                  <a
                    href={item.href}
                    className="cursor-pointer font-mono text-xs focus:bg-[#FF4D00]/15 focus:text-[#EDEAE2]"
                  >
                    {t(`navItems.${item.key}`)}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
