"use client";

import {
  Github,
  Linkedin,
  Mail,
  Code,
  Palette,
  Smartphone,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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

export default function Portfolio() {
  const skills = [
    {
      name: "Backend",
      icon: Code,
      items: [
        "Java",
        "C#",
        "Python",
        "Spring Boot",
        "ASP.NET",
        "Node.js",
        "Nest.js",
      ],
    },
    {
      name: "Frontend",
      icon: Palette,
      items: ["JavaScript", "TypeScript", "Next.js", "React", "TailwindCSS"],
    },
    {
      name: "Database",
      icon: Code,
      items: ["PostgreSQL", "MySQL", "MongoDB", "Prolog"],
    },
    {
      name: "DevOps & Tools",
      icon: Smartphone,
      items: ["Docker", "Git & GitHub", "Azure", "CI/CD", "Kafka", "Selenium"],
    },
  ];

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

      <Experiences experiences={experiencesData} />

      <Projects projects={projectsData} />

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Habilidades Técnicas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300"
              >
                <CardHeader className="text-center">
                  <skill.icon className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <CardTitle className="text-white">{skill.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {skill.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-gray-300 text-center text-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-gradient-to-b from-black to-purple-950/10">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Formação Acadêmica
          </h2>
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gray-900/50 border-purple-800/30">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <GraduationCap className="w-12 h-12 text-purple-400" />
                  <div>
                    <CardTitle className="text-white text-xl">
                      Bacharelado em Ciência da Computação
                    </CardTitle>
                    <CardDescription className="text-purple-300 font-semibold">
                      Universidade Veiga de Almeida
                    </CardDescription>
                    <p className="text-gray-400 text-sm mt-1">
                      maio 2023 – dezembro 2026
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

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
