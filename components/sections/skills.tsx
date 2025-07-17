import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export type Skill = {
  name: string;
  icon: React.ElementType;
  items: string[];
};

export type SkillsProps = {
  title: string;
  skills: Skill[];
};

export function Skills({ title, skills }: SkillsProps) {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 ">
          {skills.map((skill, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300"
            >
              <CardHeader className="text-center">
                <skill.icon className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <CardTitle className="text-white">{skill.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {skill.items.map((item, itemIndex) => (
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
