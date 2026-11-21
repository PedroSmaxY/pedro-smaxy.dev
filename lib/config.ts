export const PORTFOLIO_CONFIG = {
  personal: {
    name: "Pedro Henrique da Silva Novais",
    shortName: "Pedro Novais",
    email: "pedrohenrique.nv@icloud.com",
    phone: "+55 (21) 98602-6613",
    coordinates: "22.3886° S",
  },

  links: {
    cvDownloadUrl: "/pedro-novais-cv.pdf",
    cvDownloadUrlEn: "/pedro-novais-cv-en.pdf",
    profileImageUrl: "/pedro-portrait.jpg",
    linkedinUrl: "https://www.linkedin.com/in/pedrohenriquenv/",
    githubUrl: "https://github.com/PedroSmaxY",
  },

  technologies: {
    mainBadges: [
      "Rust",
      "Python",
      "MCP",
      "TypeScript",
      "Next.js",
      "React",
      "Fastify",
      "Ruby on Rails",
      "PostgreSQL",
      "MongoDB",
      "Node.js",
      "Docker",
    ],
  },

  skillCategories: {
    systems: ["Rust", "Rayon", "Terminal UI", "Linux", "Concurrency"],
    ai: [
      "Model Context Protocol",
      "FastMCP",
      "Spec-Driven Dev (SDD)",
      "LLM Orchestration",
      "Typst / LaTeX",
    ],
    backend: [
      "Node.js / Fastify",
      "Ruby on Rails",
      "Python / FastAPI",
      "REST APIs & SSE",
      "PostgreSQL / MongoDB / SQLite",
    ],
    frontend: [
      "TypeScript",
      "Next.js",
      "React",
      "TailwindCSS",
      "GSAP",
    ],
    devops: ["Docker", "Git & GitHub", "GitHub Actions", "CI/CD", "Vercel"],
  },
} as const;

export type PortfolioConfig = typeof PORTFOLIO_CONFIG;
export type PersonalInfo = typeof PORTFOLIO_CONFIG.personal;
export type SocialLinks = typeof PORTFOLIO_CONFIG.links;
export type Technologies = typeof PORTFOLIO_CONFIG.technologies;
export type SkillCategories = typeof PORTFOLIO_CONFIG.skillCategories;
