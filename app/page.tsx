"use client";

import { Github, Linkedin, Mail, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hero } from "@/components/sections/hero";
import { Header } from "@/components/sections/header";
import { About } from "@/components/sections/about";
import { Experiences } from "@/components/sections/experiences";
import { Projects } from "@/components/sections/projects";
import { projectsData } from "./_data/projects-data";
import { experiencesData } from "./_data/experiences-data";
import { Skills } from "@/components/sections/skills";
import { skillsData } from "./_data/skills-data";
import { Education } from "@/components/sections/education";

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
      <Projects title="Projetos" projects={projectsData} />

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

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Vamos Conversar?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Estou sempre aberto a novas oportunidades e projetos interessantes.
            Entre em contato comigo!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3"
              onClick={() =>
                window.open(
                  "mailto:pedrohenrique.nv@icloud.com",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <Mail className="mr-2 h-4 w-4" />
              pedrohenrique.nv@icloud.com
            </Button>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 bg-transparent"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/pedrohenriquenv/",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 bg-transparent"
              onClick={() =>
                window.open(
                  "https://github.com/PedroSmaxY",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-purple-900/20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Pedro Henrique da Silva Novais. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
