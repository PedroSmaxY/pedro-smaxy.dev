import { Skill } from "@/components/sections/skills";
import { Code, Palette, Smartphone } from "lucide-react";

export const skillsData: Skill[] = [
  {
    name: "Backend",
    icon: Code,
    items: [
      "Java",
      "C#",
      "Python",
      "Spring Boot",
      "ASP.NET",
      "Node.js",
      "Nest.js",
    ],
  },
  {
    name: "Frontend",
    icon: Palette,
    items: ["JavaScript", "TypeScript", "Next.js", "React", "TailwindCSS"],
  },
  {
    name: "Database",
    icon: Code,
    items: ["PostgreSQL", "MySQL", "MongoDB", "Prolog"],
  },
  {
    name: "DevOps & Tools",
    icon: Smartphone,
    items: ["Docker", "Git & GitHub", "Azure", "CI/CD", "Kafka", "Selenium"],
  },
];
