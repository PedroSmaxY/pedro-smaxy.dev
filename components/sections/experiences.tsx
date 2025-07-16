import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export type ExperiencesProps = {
  company: string;
  position: string;
  period: string;
  location: string;
  description: string[];
};

export function Experiences({
  experiences,
}: {
  experiences: ExperiencesProps[];
}) {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Experiência Profissional
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-white text-xl mb-1">
                      {exp.position}
                    </CardTitle>
                    <CardDescription className="text-purple-300 font-semibold text-lg">
                      {exp.company}
                    </CardDescription>
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    <p className="text-gray-400">{exp.period}</p>
                    <p className="text-gray-500 text-sm">{exp.location}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside marker:text-purple-400">
                  {exp.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-300">
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
