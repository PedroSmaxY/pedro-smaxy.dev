"use client";

import { ExternalLink } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { GithubLogoIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export type Project = {
  title: string;
  description: string;
  image?: string;
  tech: string[];
  github: string;
  live?: string;
  period: string;
};

export function Projects() {
  const t = useTranslations("portfolio.projects");

  const projects = t.raw("items") as Project[];
  const labels = t.raw("labels") as { code: string; demo: string };

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-black to-purple-950/10"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          {t("title")}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <CardHeader className="p-0">
                <Image
                  src={project.image || "/placeholder.svg"}
                  width={200}
                  height={300}
                  alt={project.title}
                  className="w-full h-60 object-cover rounded-t-lg"
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
                    <GithubLogoIcon className="mr-2 h-4 w-4" />
                    {labels.code}
                  </Button>
                  {project.live ? (
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() =>
                        window.open(
                          project.live,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {labels.demo}
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
