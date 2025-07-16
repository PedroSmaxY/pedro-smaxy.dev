import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experiences } from "@/components/sections/experiences";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

import { projectsData } from "./_data/projects-data";
import { experiencesData } from "./_data/experiences-data";
import { skillsData } from "./_data/skills-data";

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
        description="Desenvolvedor Full Stack curioso, com paixão por construir sistemas de alta performance, do back-end ao front-end. Experiência prática com Java, Spring Boot, Python, FastAPI, JavaScript e Next.js."
        cvUrl="/cv.pdf"
        cvDownloadLabel="pedro-novais-cv.pdf"
        downloadLabel="Download CV"
        projectsLabel="Ver Projetos"
        profileImage="/placeholder.svg?height=128&width=128"
      />
      <About
        title="Sobre Mim"
        paragraphs={[
          "Desenvolvedor Full Stack curioso, com paixão por construir sistemas de alta performance, do back-end ao front-end. Possuo experiência prática com Java, Spring Boot, Python, FastAPI, JavaScript e Next.js, além de automação de processos com Selenium e análise de dados com pandas.",
          "Atualmente, aplico uma visão integrada de negócios em consultoria, atuando em projetos de marketing, gestão de pessoas e processos comerciais. Busco colaborar em projetos com propósito, combinando conhecimento técnico com habilidades de gestão para entregar soluções completas e eficazes.",
        ]}
        badges={[
          "Java",
          "Spring Boot",
          "Python",
          "FastAPI",
          "Next.js",
          "TypeScript",
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
