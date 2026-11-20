import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { LanguageSwitcher } from "../language-switcher";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { PORTFOLIO_CONFIG } from "@/lib/config";

const NAV_LINKS = [
  { href: "#home", key: "home" },
  { href: "#about", key: "about" },
  { href: "#experience", key: "experiences" },
  { href: "#projects", key: "projects" },
  { href: "#skills", key: "skills" },
  { href: "#contact", key: "contact" },
] as const;

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
              {NAV_LINKS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="hover:text-purple-400 transition-colors"
                >
                  {t(`navItems.${item.key}`)}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-gray-300 hover:text-white hover:bg-purple-600/20"
                    aria-label="Menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-gray-900 border-gray-700 lg:hidden"
                >
                  {NAV_LINKS.map((item) => (
                    <DropdownMenuItem key={item.key} asChild>
                      <a
                        href={item.href}
                        className="cursor-pointer hover:bg-purple-600/20"
                      >
                        {t(`navItems.${item.key}`)}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
