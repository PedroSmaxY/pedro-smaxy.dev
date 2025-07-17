import { Project } from "@/components/sections/projects";

export const projectsData: Project[] = [
  {
    title: "Projeto Full Stack - Desafio FuriaGG",
    description:
      "Desenvolvimento de um projeto full stack com landing page mobile first em Next.js, API Restful com Fastify e Bot Telegram em Python.",
    image:
      "/furia-landingpage-project.png",
    tech: [
      "Next.js",
      "Fastify",
      "Python",
      "Telegram Bot",
      "TypeScript",
      "React",
      "TailwindCSS",
      "shadcn/ui",
      "Docker",
    ],
    github: "https://github.com/PedroSmaxY/furia-fanbot",
    live: "https://furia-fanbot.vercel.app/",
    period: "Abril 2025",
  },
  {
    title: "API de Sistema de Agendamento",
    description:
      "API RESTful robusta para gerenciamento de agendamentos, desenvolvida com ASP.NET Core e Entity Framework. Implementa autenticação JWT, controle de acesso baseado em papéis (Admin/Cliente) e um fluxo completo para agendar e gerenciar horários. O projeto é containerizado com Docker e documentado via Swagger UI.",
    image: "/cs-project-background.png",
    tech: [
      "C#",
      "ASP.NET",
      "Entity Framework",
      "PostgreSQL",
      "Docker",
      "JWT",
      "Swagger",
    ],
    github: "https://github.com/PedroSmaxY/SchedulingSystemAPI",
    period: "Abril 2025",
  },
  {
    title: "Sistemas Corporativos",
    description:
      "Desenvolvimento de aplicações empresariais com foco em alta performance e escalabilidade usando tecnologias modernas.",
    image: "/placeholder.svg",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Azure"],
    github: "https://github.com/PedroSmaxY",
    live: "#",
    period: "2024",
  },
  {
    title: "API REST com Integração Web e Mobile",
    description:
      "API RESTful com FastAPI (Python) integrada a base de dados Prolog, com interfaces React/TailwindCSS e app Android nativo em Kotlin.",
    image: "/placeholder.svg",
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
];
