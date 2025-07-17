import { Skill } from "@/components/sections/skills";
import { FlowArrowIcon } from "@phosphor-icons/react/dist/ssr";
import { Code, Database, Palette, Smartphone } from "lucide-react";

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
      "Fastify",
      "Nest.js",
    ],
  },
  {
    name: "Frontend",
    icon: Palette,
    items: [
      "JavaScript",
      "TypeScript",
      "Next.js",
      "React",
      "TailwindCSS",
      "shadcn/ui",
    ],
  },
  {
    name: "Database",
    icon: Database,
    items: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    name: "DevOps & Tools",
    icon: FlowArrowIcon,
    items: ["Docker", "Git & GitHub", "Vercel", "Azure", "CI/CD", "Kafka"],
  },
  {
    name: "Mobile",
    icon: Smartphone,
    items: ["Kotlin", "Android", "React Native"],
  },
];
