import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("portfolio.footer");
  
  return (
    <footer className="py-8 border-t border-purple-900/20">
      <div className="container mx-auto px-6 text-center">
        <p className="text-gray-400" suppressHydrationWarning>
          © {new Date().getFullYear()} Pedro Henrique da Silva Novais. {t("license")}
        </p>
      </div>
    </footer>
  );
}
