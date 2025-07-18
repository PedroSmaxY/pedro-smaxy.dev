import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experiences } from "@/components/sections/experiences";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

import { projectsData } from "@/data/projects-data";
import { experiencesData } from "@/data/experiences-data";
import { skillsData } from "@/data/skills-data";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header
        name="Pedro SmaxY"
        navItems={{
          start: "Início",
          about: "Sobre",
          experience: "Experiência",
          projects: "Projetos",
          skills: "Habilidades",
          contact: "Contato",
        }}
      />
      <Hero
        name="Pedro Henrique da Silva Novais"
        role="Desenvolvedor Full Stack"
        location="Rio de Janeiro, RJ"
        phone="(21) 98602-6613"
        description="Desenvolvedor Full Stack curioso, com paixão por construir sistemas de alta performance, do back-end ao front-end. Experiência prática com Java, Spring Boot, Python, FastAPI, TypeScript e Next.js."
        cvUrl="/pedro-novais-cv.pdf"
        downloadLabel="Download CV"
        projectsLabel="Ver Projetos"
        profileImage="/perfil-logo.jpg"
      />
      <About
        title="Sobre Mim"
        paragraphs={[
          "Desenvolvedor Full Stack curioso, apaixonado por construir sistemas de alta performance. Minha experiência abrange desde o desenvolvimento de APIs RESTful robustas com Java (Spring Boot), C# (ASP.NET) e Python (FastAPI), até a criação de interfaces dinâmicas e responsivas com TypeScript, React.js e Next.js. Possuo familiaridade com bancos de dados como PostgreSQL, MySQL e SQLite, e utilizo ferramentas como Docker e práticas de CI/CD para otimizar o fluxo de desenvolvimento.",
          "Atualmente, aplico uma visão integrada de negócios em consultoria, atuando em projetos de marketing, gestão de pessoas e processos comerciais. Busco colaborar em projetos com propósito, combinando conhecimento técnico com habilidades de gestão para entregar soluções completas e eficazes.",
        ]}
        badges={[
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
        ]}
        emoji="👨‍💻"
      />
      <Experiences
        title="Experiência Profissional"
        experiences={experiencesData}
      />
      <Projects
        title="Projetos"
        projects={projectsData}
        label={{ code: "Código", demo: "Demo" }}
      />
      <Skills title="Habilidades" skills={skillsData} />
      <Education
        title="Formação Acadêmica"
        educationExperience={[
          {
            degree: "Bacharelado em Ciência da Computação",
            institution: "Universidade Veiga de Almeida",
            period: "maio 2023 – dezembro 2026",
          },
        ]}
      />
      <Contact
        title="Vamos Conversar?"
        subtitle="Estou sempre aberto a novas oportunidades e projetos interessantes. Entre em contato comigo!"
        email="pedrohenrique.nv@icloud.com"
        linkedinUrl="https://www.linkedin.com/in/pedrohenriquenv/"
        githubUrl="https://github.com/PedroSmaxY"
      />
      <Footer license="Licenciado sob a Licença MIT" />
    </div>
  );
}
