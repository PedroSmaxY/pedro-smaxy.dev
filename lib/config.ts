export const PORTFOLIO_CONFIG = {
  personal: {
    name: "Pedro Henrique da Silva Novais",
    shortName: "Pedro SmaxY",
    email: "pedrohenrique.nv@icloud.com",
    phone: "+55 (21) 98602-6613",
    location: "Rio de Janeiro, Brazil",
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

  baseMetadata: {
    metadataBase: new URL(process.env.METADATA_BASE || "http://localhost:3000"),
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      type: "website" as const,
      images: ["/og-image.jpg"],
    },
    authors: [{ name: "Pedro SmaxY", url: "https://github.com/PedroSmaxY" }],
  },
} as const;

export type PortfolioConfig = typeof PORTFOLIO_CONFIG;
export type PersonalInfo = typeof PORTFOLIO_CONFIG.personal;
export type SocialLinks = typeof PORTFOLIO_CONFIG.links;
export type Technologies = typeof PORTFOLIO_CONFIG.technologies;
export type SkillCategories = typeof PORTFOLIO_CONFIG.skillCategories;
