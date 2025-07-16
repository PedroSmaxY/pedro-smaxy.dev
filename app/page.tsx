"use client";

import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Code,
  Palette,
  Smartphone,
  GraduationCap,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Portfolio() {
  const projects = [
    {
      title: "API REST com Integração Web e Mobile",
      description:
        "API RESTful com FastAPI (Python) integrada a base de dados Prolog, com interfaces React/TailwindCSS e app Android nativo em Kotlin.",
      image: "/placeholder.svg?height=200&width=300",
      tech: [
        "FastAPI",
        "Python",
        "React",
        "TailwindCSS",
        "Kotlin",
        "Android",
        "Prolog",
      ],
      github: "https://github.com/PedroSmaxY",
      live: "#",
      period: "Julho - Dezembro 2024",
    },
    {
      title: "Sistema de Automação - Seguros Fleet",
      description:
        "Solução de automação em Python com Pandas e Selenium para extrair, validar e inserir dados, reduzindo 40% do tempo em tarefas repetitivas.",
      image: "/placeholder.svg?height=200&width=300",
      tech: ["Python", "Pandas", "Selenium", "Automação", "Web Scraping"],
      github: "#",
      live: "#",
      period: "Agosto - Novembro 2024",
    },
    {
      title: "Sistemas Corporativos",
      description:
        "Desenvolvimento de aplicações empresariais com foco em alta performance e escalabilidade usando tecnologias modernas.",
      image: "/placeholder.svg?height=200&width=300",
      tech: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Azure"],
      github: "https://github.com/PedroSmaxY",
      live: "#",
      period: "2024",
    },
  ];

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

  const experiences = [
    {
      company: "Salto Consultoria",
      position: "Analista de Gestão de Projetos",
      period: "junho 2025 - Presente",
      location: "Rio de Janeiro, Brasil",
      description: [
        "Participação ativa em projetos estratégicos com visão integrada das operações",
        "Estruturação de fluxos para captação e acompanhamento de clientes",
        "Iniciativas de cultura organizacional e definição de valores empresariais",
        "Criação de campanhas de marketing e análise de público-alvo",
      ],
    },
    {
      company: "Salto Consultoria",
      position: "Trainee",
      period: "abril 2025 - junho 2025",
      location: "Rio de Janeiro, Brasil",
      description: [
        "Desenvolvimento de habilidades em gestão de projetos e consultoria",
        "Apoio em processos de engajamento interno e cultura organizacional",
      ],
    },
    {
      company: "Seguros Fleet",
      position: "Desenvolvedor de Automação",
      period: "agosto 2024 - novembro 2024",
      location: "Rio de Janeiro, Brasil",
      description: [
        "Desenvolvimento de solução de automação em Python com Pandas e Selenium",
        "Redução de 40% no tempo gasto em tarefas repetitivas",
        "Aumento da precisão dos dados processados",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-purple-900/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Pedro Novais
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#home"
                className="hover:text-purple-400 transition-colors"
              >
                Início
              </a>
              <a
                href="#about"
                className="hover:text-purple-400 transition-colors"
              >
                Sobre
              </a>
              <a
                href="#experience"
                className="hover:text-purple-400 transition-colors"
              >
                Experiência
              </a>
              <a
                href="#projects"
                className="hover:text-purple-400 transition-colors"
              >
                Projetos
              </a>
              <a
                href="#skills"
                className="hover:text-purple-400 transition-colors"
              >
                Habilidades
              </a>
              <a
                href="#contact"
                className="hover:text-purple-400 transition-colors"
              >
                Contato
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-900/10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-black">
                <img
                  src="/placeholder.svg?height=128&width=128"
                  alt="Pedro Henrique da Silva Novais"
                  className="w-full h-full object-cover rounded-full"
                />
                <div
                  className="w-full h-full rounded-full bg-black flex items-center justify-center"
                  style={{ display: "none" }}
                >
                  <span className="text-4xl font-bold text-purple-400">PN</span>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Pedro Henrique da Silva Novais
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-300 mb-4 font-semibold">
            Desenvolvedor Full Stack
          </p>
          <div className="flex items-center justify-center gap-6 mb-8 text-gray-300">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-400" />
              <span>Rio de Janeiro, RJ</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-purple-400" />
              <span>(21) 98602-6613</span>
            </div>
          </div>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Desenvolvedor Full Stack curioso, com paixão por construir sistemas
            de alta performance, do back-end ao front-end. Experiência prática
            com Java, Spring Boot, Python, FastAPI, JavaScript e Next.js.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3"
            >
              <a href="/cv.pdf" download="Pedro_Henrique_Novais_CV.pdf">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 bg-transparent"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Ver Projetos
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-b from-black to-purple-950/10"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Sobre Mim
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Desenvolvedor Full Stack curioso, com paixão por construir
                sistemas de alta performance, do back-end ao front-end. Possuo
                experiência prática com Java, Spring Boot, Python, FastAPI,
                JavaScript e Next.js, além de automação de processos com
                Selenium e análise de dados com pandas.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Atualmente, aplico uma visão integrada de negócios em
                consultoria, atuando em projetos de marketing, gestão de pessoas
                e processos comerciais. Busco colaborar em projetos com
                propósito, combinando conhecimento técnico com habilidades de
                gestão para entregar soluções completas e eficazes.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-purple-600 hover:bg-purple-700">
                  Java
                </Badge>
                <Badge className="bg-purple-600 hover:bg-purple-700">
                  Spring Boot
                </Badge>
                <Badge className="bg-purple-600 hover:bg-purple-700">
                  Python
                </Badge>
                <Badge className="bg-purple-600 hover:bg-purple-700">
                  FastAPI
                </Badge>
                <Badge className="bg-purple-600 hover:bg-purple-700">
                  Next.js
                </Badge>
                <Badge className="bg-purple-600 hover:bg-purple-700">
                  TypeScript
                </Badge>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-lg flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Experiência Profissional
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-white text-xl mb-1">
                        {exp.position}
                      </CardTitle>
                      <CardDescription className="text-purple-300 font-semibold text-lg">
                        {exp.company}
                      </CardDescription>
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <p className="text-gray-400">{exp.period}</p>
                      <p className="text-gray-500 text-sm">{exp.location}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {exp.description.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-gray-300 flex items-start"
                      >
                        <span className="text-purple-400 mr-2 mt-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 bg-gradient-to-b from-black to-purple-950/10"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Projetos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <CardHeader className="p-0">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-white text-lg">
                      {project.title}
                    </CardTitle>
                    <span className="text-xs text-purple-300 bg-purple-900/30 px-2 py-1 rounded">
                      {project.period}
                    </span>
                  </div>
                  <CardDescription className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="bg-purple-900/30 text-purple-300 text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent"
                      onClick={() =>
                        window.open(
                          project.github,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Código
                    </Button>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
