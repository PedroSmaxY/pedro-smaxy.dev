export const PORTFOLIO_CONFIG = {
  personal: {
    name: "Pedro Henrique da Silva Novais",
    shortName: "Pedro SmaxY",
    email: "pedrohenrique.nv@icloud.com",
    phone: "+55 (21) 98602-6613",
    emoji: "👨‍💻",
  },

  links: {
    cvDownloadUrl: "/pedro-novais-cv.pdf",
    profileImageUrl: "/perfil-logo.jpg",
    linkedinUrl: "https://www.linkedin.com/in/pedrohenriquenv/",
    githubUrl: "https://github.com/PedroSmaxY",
  },

  technologies: {
    mainBadges: [
      "Python",
      "C#",
      "ASP.NET Core",
      "Java",
      "Spring Boot",
      "TypeScript",
      "React.js",
      "Next.js",
      "Node.js",
      "Nest.js",
    ],
  },

  skillCategories: {
    backend: [
      "Java",
      "C#",
      "Python",
      "Spring Boot",
      "ASP.NET",
      "Node.js",
      "Fastify",
      "Nest.js",
    ],
    frontend: [
      "JavaScript",
      "TypeScript",
      "Next.js",
      "React",
      "TailwindCSS",
      "shadcn/ui",
    ],
    database: ["PostgreSQL", "MySQL", "MongoDB"],
    devops: ["Docker", "Git & GitHub", "Vercel", "Azure", "CI/CD", "Kafka"],
    mobile: ["Kotlin", "Android", "React Native"],
  },
} as const;

export type PortfolioConfig = typeof PORTFOLIO_CONFIG;
export type PersonalInfo = typeof PORTFOLIO_CONFIG.personal;
export type SocialLinks = typeof PORTFOLIO_CONFIG.links;
export type Technologies = typeof PORTFOLIO_CONFIG.technologies;
export type SkillCategories = typeof PORTFOLIO_CONFIG.skillCategories;
