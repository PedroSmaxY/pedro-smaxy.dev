import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useTranslations } from "next-intl";
import { getSkillIcon } from "@/lib/get-skill-icon";

export type Category = {
  title: string;
  skills: string[];
};

export function Skills() {
  const t = useTranslations("portfolio.skills");

  const categories = t.raw("categories") as Record<string, Category>;

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          {t("title")}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 ">
          {Object.entries(categories).map(([key, category], index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300"
            >
              <CardHeader className="text-center">
                {getSkillIcon(key, "h-8 w-8 mx-auto mb-2 text-purple-400")}
                <CardTitle className="text-white">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.skills.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-gray-300 text-center text-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
