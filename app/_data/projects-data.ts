import { ProjectProps } from "@/components/sections/projects";

export const projectsData: ProjectProps[] = [
  {
    title: "API REST com Integração Web e Mobile",
    description:
      "API RESTful com FastAPI (Python) integrada a base de dados Prolog, com interfaces React/TailwindCSS e app Android nativo em Kotlin.",
    image: "/placeholder.svg?height=200&width=300",
    tech: [
      "FastAPI",
      "Python",
      "React",
      "TailwindCSS",
      "Kotlin",
      "Android",
      "Prolog",
    ],
    github: "https://github.com/PedroSmaxY",
    live: "#",
    period: "Julho - Dezembro 2024",
  },
  {
    title: "Sistema de Automação - Seguros Fleet",
    description:
      "Solução de automação em Python com Pandas e Selenium para extrair, validar e inserir dados, reduzindo 40% do tempo em tarefas repetitivas.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["Python", "Pandas", "Selenium", "Automação", "Web Scraping"],
    github: "#",
    live: "#",
    period: "Agosto - Novembro 2024",
  },
  {
    title: "Sistemas Corporativos",
    description:
      "Desenvolvimento de aplicações empresariais com foco em alta performance e escalabilidade usando tecnologias modernas.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Azure"],
    github: "https://github.com/PedroSmaxY",
    live: "#",
    period: "2024",
  },
];
