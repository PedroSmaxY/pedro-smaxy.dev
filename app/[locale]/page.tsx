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
      <Education />
      <Contact />
      <Footer license="Licenciado sob a Licença MIT" />
    </div>
  );
}
