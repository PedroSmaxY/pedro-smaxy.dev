"use client";

import { ExternalLink, Github } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export type Project = {
  title: string;
  description: string;
  image?: string;
  tech: string[];
  github: string;
  live: string;
  period: string;
};

export type ProjectProps = {
  title: string;
  label: { code: string; demo: string };
  projects: Project[];
};

export function Projects({ title, projects, label }: ProjectProps) {
  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-black to-purple-950/10"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          {title}
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
                    {label.code}
                  </Button>
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {label.demo}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
