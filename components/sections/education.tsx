import { GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";

export type Education = {
  institution: string;
  degree: string;
  period: string;
};

export function Education() {
  const t = useTranslations("portfolio.education");
  const educationExperience = t.raw("educationExperience") as Education[];

  return (
    <section
      className="grid lg:grid-cols-12 border-b border-[#EDEAE2]/10"
      aria-labelledby="education-title"
    >
      <div className="lg:col-span-4 px-6 sm:px-10 py-10 lg:border-r border-[#EDEAE2]/10">
        <h2
          id="education-title"
          className="font-serif text-3xl tracking-[-0.02em] text-[#EDEAE2]"
        >
          {t("title")}
        </h2>
      </div>

      <div className="lg:col-span-8 divide-y divide-[#EDEAE2]/10">
        {educationExperience.map((edu, index) => (
          <div
            key={index}
            className="px-6 sm:px-10 py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <GraduationCap
                className="w-5 h-5 text-[#FF4D00] mt-1 shrink-0"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-serif text-2xl text-[#EDEAE2]">
                  {edu.degree}
                </h3>
                <p className="font-mono text-xs text-[#9A968E] mt-1">
                  {edu.institution}
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-[#9A968E] tabular-nums pl-9 sm:pl-0">
              {edu.period}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
