"use client";

import { motion, Variants } from "framer-motion";
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
            variants={titleVariants}
          >
            {t("title")}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.05 }}
              >
                <motion.div
                  whileHover={{
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                >
                  <Card className="bg-gray-900/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 h-full flex flex-col">
                    <CardHeader className="p-0">
                      <div className="overflow-hidden rounded-t-lg">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          width={200}
                          height={300}
                          alt={project.title}
                          className="w-full h-60 object-cover"
                        />
                      </div>
                    </CardHeader>

                    <CardContent className="p-6 flex-1 flex flex-col">
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
                            className="bg-purple-900/30 text-purple-300 text-xs cursor-default"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2 mt-auto">
                        <motion.div whileHover={{ scale: 1.01 }}>
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
                        </motion.div>

                        {project.live && (
                          <motion.div whileHover={{ scale: 1.01 }}>
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
                          </motion.div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
