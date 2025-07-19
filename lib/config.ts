export const PORTFOLIO_CONFIG = {
  personal: {
    name: "Pedro Henrique da Silva Novais",
    shortName: "Pedro SmaxY",
    email: "pedrohenrique.nv@icloud.com",
    phone: "+55 (21) 98602-6613",
    location: "Rio de Janeiro, Brazil",
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

  categories: {
    Backend: {
      skills: [
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
    Frontend: {
      skills: [
        "JavaScript",
        "TypeScript",
        "Next.js",
        "React",
        "TailwindCSS",
        "shadcn/ui",
      ],
    },
    Database: {
      skills: ["PostgreSQL", "MySQL", "MongoDB"],
    },
    "Devops & Tools": {
      skills: ["Docker", "Git & GitHub", "Vercel", "Azure", "CI/CD", "Kafka"],
    },
    Mobile: {
      skills: ["Kotlin", "Android", "React Native"],
    },
  },
} as const;

export type PortfolioConfig = typeof PORTFOLIO_CONFIG;
export type PersonalInfo = typeof PORTFOLIO_CONFIG.personal;
export type SocialLinks = typeof PORTFOLIO_CONFIG.links;
export type Technologies = typeof PORTFOLIO_CONFIG.technologies;
export type Categories = typeof PORTFOLIO_CONFIG.categories;
