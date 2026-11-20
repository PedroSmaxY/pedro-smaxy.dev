export const PORTFOLIO_CONFIG = {
  personal: {
    name: "Pedro Henrique da Silva Novais",
    shortName: "Pedro SmaxY",
    email: "pedrohenrique.nv@icloud.com",
    phone: "+55 (21) 98602-6613",
    coordinates: "22.9068° S",
  },

  links: {
    cvDownloadUrl: "/pedro-novais-cv.pdf",
    profileImageUrl: "/perfil-logo.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/pedrohenriquenv/",
    githubUrl: "https://github.com/PedroSmaxY",
  },

  technologies: {
    mainBadges: [
      "Rust",
      "Python",
      "MCP",
      "C#",
      "ASP.NET Core",
      "Java",
      "Spring Boot",
      "TypeScript",
      "React 19",
      "Next.js",
      "Tauri",
      "Docker",
    ],
  },

  skillCategories: {
    systems: ["Rust", "Tauri", "Rayon", "Terminal UI", "C"],
    ai: ["Model Context Protocol", "FastMCP", "Typst", "LaTeX", "Spec-Driven Dev"],
    backend: [
      "C# / ASP.NET Core 9",
      "Java / Spring Boot",
      "Python / FastAPI",
      "Node.js / Fastify",
      "PostgreSQL / MySQL / SQLite",
    ],
    frontend: [
      "TypeScript",
      "Next.js",
      "React 19",
      "TailwindCSS",
      "GSAP",
    ],
    devops: ["Docker", "Git & GitHub", "CI/CD", "Vercel", "Azure"],
  },
} as const;

export type PortfolioConfig = typeof PORTFOLIO_CONFIG;
export type PersonalInfo = typeof PORTFOLIO_CONFIG.personal;
export type SocialLinks = typeof PORTFOLIO_CONFIG.links;
export type Technologies = typeof PORTFOLIO_CONFIG.technologies;
export type SkillCategories = typeof PORTFOLIO_CONFIG.skillCategories;
