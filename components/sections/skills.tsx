import { useTranslations } from "next-intl";
import { getSkillIcon } from "@/lib/get-skill-icon";
import { PORTFOLIO_CONFIG } from "@/lib/config";

export function Skills() {
  const t = useTranslations("portfolio.skills");
  const categories = PORTFOLIO_CONFIG.skillCategories;
  const categoryTitles = t.raw("categoryTitles") as Record<string, string>;

  return (
    <section id="skills" className="border-b border-[#EDEAE2]/10">
      <div className="px-6 sm:px-10 py-8 border-b border-[#EDEAE2]/10">
        <h2 className="font-serif text-3xl sm:text-4xl tracking-[-0.02em] text-[#EDEAE2]">
          {t("title")}
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#EDEAE2]/10">
        {Object.entries(categories).map(([key, items]) => (
          <div key={key} className="p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5 text-[#FF4D00]">
              {getSkillIcon(key, "h-4 w-4 shrink-0")}
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#EDEAE2]">
                {categoryTitles[key]}
              </h3>
            </div>
            <ul className="space-y-2">
              {items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-[#9A968E] font-mono leading-snug"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
