"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (nextLocale: "pt-BR" | "en") => {
    if (nextLocale !== locale) {
      router.replace(pathname, { locale: nextLocale });
    }
  };

  return (
    <div
      className="inline-flex items-center gap-1.5 font-mono text-xs"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => switchTo("pt-BR")}
        className={`px-1.5 py-0.5 transition-colors cursor-pointer ${
          locale === "pt-BR"
            ? "text-[#EDEAE2] underline decoration-[#FF4D00] underline-offset-4"
            : "text-[#9A968E] hover:text-[#EDEAE2]"
        }`}
      >
        PT
      </button>
      <span className="text-[#636059]">/</span>
      <button
        type="button"
        onClick={() => switchTo("en")}
        className={`px-1.5 py-0.5 transition-colors cursor-pointer ${
          locale === "en"
            ? "text-[#EDEAE2] underline decoration-[#FF4D00] underline-offset-4"
            : "text-[#9A968E] hover:text-[#EDEAE2]"
        }`}
      >
        EN
      </button>
      <span
        className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] ml-1"
        aria-hidden="true"
      />
    </div>
  );
}
