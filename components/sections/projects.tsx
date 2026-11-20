"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { createMotionScope, gsap, MOTION } from "@/lib/motion";

export type Project = {
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  tech: string[];
  github: string;
  live?: string;
  period: string;
};

export function Projects() {
  const t = useTranslations("portfolio.projects");
  const rootRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const projects = t.raw("items") as Project[];
  const labels = t.raw("labels") as { code: string; demo: string };

  useEffect(() => {
    return createMotionScope(rootRef.current, ({ reduceMotion }) => {
      if (reduceMotion) return;

      gsap.from("[data-project-row]", {
        y: 16,
        autoAlpha: 0,
        duration: MOTION.duration.enter,
        stagger: MOTION.stagger,
        ease: MOTION.ease,
        clearProps: "transform,opacity,visibility",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          once: true,
        },
      });
    });
  }, []);

  return (
    <section
      id="projects"
      ref={rootRef}
      className="border-b border-[#EDEAE2]/10"
    >
      <div className="px-6 sm:px-10 py-8 border-b border-[#EDEAE2]/10 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-serif text-3xl sm:text-4xl tracking-[-0.02em] text-[#EDEAE2]">
          {t("title")}
        </h2>
        <span className="font-mono text-xs text-[#9A968E] uppercase tracking-wider">
          {t("hint")}
        </span>
      </div>

      <div className="divide-y divide-[#EDEAE2]/10">
        {projects.map((project, index) => {
          const isOpen = activeIndex === index;
          const indexCode = String(index + 1).padStart(2, "0");

          return (
            <div
              key={project.title}
              data-project-row
              className={`transition-colors ${
                isOpen ? "bg-[#0F1013]" : "hover:bg-[#EDEAE2]/[0.02]"
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setActiveIndex(isOpen ? -1 : index)}
                className="w-full text-left px-6 sm:px-10 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-baseline gap-5 sm:gap-7">
                  <span
                    className={`font-mono text-xs tabular-nums ${
                      isOpen ? "text-[#FF4D00]" : "text-[#9A968E]"
                    }`}
                  >
                    {indexCode}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-[#EDEAE2]">
                      {project.title}
                    </h3>
                    {project.subtitle ? (
                      <p className="font-mono text-[11px] text-[#9A968E] mt-1 uppercase tracking-wider">
                        {project.subtitle}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center gap-5 font-mono text-xs text-[#9A968E] pl-9 md:pl-0">
                  <span className="hidden sm:inline">
                    {project.tech.slice(0, 3).join(" · ")}
                  </span>
                  <span className="tabular-nums text-[#636059]">
                    {project.period}
                  </span>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isOpen ? "rotate-90 text-[#FF4D00]" : "text-[#EDEAE2]"
                    }`}
                  />
                </div>
              </button>

              {isOpen ? (
                <div className="px-6 sm:px-10 pb-8 pt-2 sm:pl-[5.25rem] grid lg:grid-cols-12 gap-6 items-start">
                  <div
                    className={`${
                      project.image ? "lg:col-span-7" : "lg:col-span-8"
                    } space-y-5`}
                  >
                    <p className="text-sm sm:text-base text-[#EDEAE2]/85 leading-relaxed max-w-[65ch]">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 border border-[#EDEAE2]/15 bg-[#0A0B0D] font-mono text-xs text-[#EDEAE2]/85"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-[#EDEAE2]/20 hover:border-[#FF4D00] font-mono text-xs text-[#EDEAE2] transition-colors"
                      >
                        <GithubLogoIcon className="h-4 w-4" />
                        {labels.code}
                        <ArrowUpRight className="h-3.5 w-3.5 text-[#FF4D00]" />
                      </a>
                      {project.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF4D00] hover:bg-[#ff621f] font-mono text-xs font-bold text-[#0A0B0D] transition-colors"
                        >
                          {labels.demo}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      ) : null}
                    </div>
                  </div>

                  {project.image ? (
                    <div className="lg:col-span-5 border border-[#EDEAE2]/15 bg-[#07080A] overflow-hidden">
                      <Image
                        src={project.image}
                        width={640}
                        height={380}
                        alt={project.title}
                        className="w-full h-48 sm:h-56 object-cover"
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
