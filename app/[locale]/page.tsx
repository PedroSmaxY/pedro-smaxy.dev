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
      <Header />
      <Hero />
      <About />
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
