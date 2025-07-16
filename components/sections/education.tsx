import { GraduationCap } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export type Education = {
  institution: string;
  degree: string;
  period: string;
};

export type EducationProps = {
  title: string;
  educationExperience: Education[];
};

export function Education({ title, educationExperience }: EducationProps) {
  return (
    <section
      className="py-20 bg-gradient-to-b from-black to-purple-950/10"
      aria-labelledby="education-title"
    >
      <div className="container mx-auto px-6">
        <h2
          id="education-title"
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
        >
          {title}
        </h2>
        <div className="max-w-2xl mx-auto">
          <ul>
            {educationExperience.map((edu, index) => (
              <li key={index} className="mb-8 last:mb-0">
                <Card className="bg-gray-900/50 border-purple-800/30">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <GraduationCap
                        className="w-12 h-12 text-purple-400"
                        aria-hidden="true"
                      />
                      <div>
                        <CardTitle className="text-white text-xl">
                          {edu.degree}
                        </CardTitle>
                        <CardDescription className="text-purple-300 font-semibold">
                          {edu.institution}
                        </CardDescription>
                        <p className="text-gray-400 text-sm mt-1">
                          {edu.period}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
