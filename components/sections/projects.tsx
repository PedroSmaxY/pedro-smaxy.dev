"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { createMotionScope, gsap, MOTION } from "@/lib/motion";
import { ProjectSchematic } from "@/components/project-schematic";

export type Project = {
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  terminalPreview?: string[];
  tech: string[];
  github: string;
  live?: string;
  period: string;
};

function ProjectViewport({
  project,
  projectIndex,
  indexCode,
}: {
  project: Project;
  projectIndex: number;
  indexCode: string;
}) {
  const hasCapture = Boolean(project.image);
  const [capturedForIndex, setCapturedForIndex] = useState<number | null>(null);
  const activeMode =
    hasCapture && capturedForIndex === projectIndex ? "capture" : "schematic";

  return (
    <div className="border border-[#EDEAE2]/15 bg-[#07080A] overflow-hidden">
      <div className="h-9 flex items-center justify-between px-4 border-b border-[#EDEAE2]/10 font-mono text-[10px] text-[#9A968E] uppercase tracking-wider gap-3">
        <span>
          PRJ_{indexCode} {"//"}{" "}
          {activeMode === "capture" ? "RENDER_CAPTURE" : "LIVE_SCHEMATIC"}
        </span>
        <div className="flex items-center gap-3">
          {hasCapture ? (
            <button
              type="button"
              aria-pressed={activeMode === "capture"}
              onClick={() =>
                setCapturedForIndex(
                  activeMode === "schematic" ? projectIndex : null
                )
              }
              className="px-2 py-0.5 border border-[#EDEAE2]/15 hover:border-[#FF4D00] text-[#EDEAE2] transition-colors cursor-pointer"
            >
              [{activeMode === "schematic" ? "CAPTURE" : "SCHEMATIC"}]
            </button>
          ) : null}
          <span className="text-[#FF4D00] tabular-nums">{project.period}</span>
        </div>
      </div>

      <div className="relative aspect-video w-full overflow-hidden bg-[#050608]">
        <div className="absolute inset-0">
          <ProjectSchematic
            index={projectIndex}
            project={project}
            viewMode={activeMode}
          />
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const t = useTranslations("portfolio.projects");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const hasInteractedRef = useRef(false);

  const projects = t.raw("items") as Project[];
  const labels = t.raw("labels") as { code: string; demo: string };
  const selected = projects[activeIndex] ?? projects[0];
  const selectedCode = String(activeIndex + 1).padStart(2, "0");

  const handleListKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const total = projects.length;
    if (!total) return;

    let nextIndex: number | null = null;
    if (e.key === "ArrowDown") {
      nextIndex = (index + 1) % total;
    } else if (e.key === "ArrowUp") {
      nextIndex = (index - 1 + total) % total;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = total - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      setActiveIndex(nextIndex);
      itemRefs.current[nextIndex]?.focus();
    }
  };

  useEffect(() => {
    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true;
      return;
    }

    return createMotionScope(stageRef.current, ({ reduceMotion }) => {
      if (reduceMotion) return;

      gsap.fromTo(
        stageRef.current,
        { autoAlpha: 0.55, y: 4 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.24,
          ease: MOTION.ease,
          overwrite: true,
          clearProps: "transform,opacity,visibility",
        }
      );
    });
  }, [activeIndex]);

  return (
    <section id="projects" className="border-b border-[#EDEAE2]/10">
      <div className="px-6 sm:px-10 py-8 border-b border-[#EDEAE2]/10 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-serif text-3xl sm:text-4xl tracking-[-0.02em] text-[#EDEAE2]">
          {t("title")}
        </h2>
        <span className="font-mono text-xs text-[#9A968E] uppercase tracking-wider">
          {t("hint")}
        </span>
      </div>

      {/* Desktop: Unified 5/7 Interactive Split Showcase */}
      <div className="hidden lg:grid lg:grid-cols-12">
        <div className="lg:col-span-5 divide-y divide-[#EDEAE2]/10 border-r border-[#EDEAE2]/10">
          {projects.map((project, index) => {
            const isSelected = activeIndex === index;
            const indexCode = String(index + 1).padStart(2, "0");

            return (
              <button
                key={project.title}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(e) => handleListKeyDown(e, index)}
                className={`relative w-full text-left px-8 py-6 flex items-center justify-between gap-4 transition-colors duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#0F1013]"
                    : "hover:bg-[#EDEAE2]/[0.02]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-0 bottom-0 w-0.5 bg-[#FF4D00] transition-opacity duration-200 ${
                    isSelected ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div className="flex items-baseline gap-5 min-w-0">
                  <span
                    className={`font-mono text-xs tabular-nums shrink-0 transition-colors ${
                      isSelected ? "text-[#FF4D00]" : "text-[#9A968E]"
                    }`}
                  >
                    {indexCode}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-serif text-2xl tracking-tight text-[#EDEAE2] truncate">
                      {project.title}
                    </h3>
                    {project.subtitle ? (
                      <p className="font-mono text-[11px] text-[#9A968E] mt-1 uppercase tracking-wider truncate">
                        {project.subtitle}
                      </p>
                    ) : null}
                  </div>
                </div>
                <ChevronRight
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                    isSelected
                      ? "text-[#FF4D00] translate-x-0.5"
                      : "text-[#636059]"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-7 bg-[#0F1013]/60">
          {selected ? (
            <div ref={stageRef} className="sticky top-20 p-8 xl:p-10 space-y-6">
              <ProjectViewport
                project={selected}
                projectIndex={activeIndex}
                indexCode={selectedCode}
              />

              <div className="min-h-[228px] flex flex-col justify-between gap-5">
                <div className="space-y-4">
                  <div
                    data-proj-title
                    className="flex items-baseline justify-between gap-4"
                  >
                    <h3 className="font-serif text-3xl text-[#EDEAE2]">
                      {selected.title}
                    </h3>
                    <span className="font-mono text-xs text-[#9A968E] tabular-nums">
                      {selected.period}
                    </span>
                  </div>

                  <p
                    data-proj-desc
                    className="min-h-[4.5rem] text-base text-[#EDEAE2]/85 leading-relaxed max-w-[65ch]"
                  >
                    {selected.description}
                  </p>

                  <div data-proj-tech className="flex flex-wrap gap-1.5">
                    {selected.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 border border-[#EDEAE2]/15 bg-[#0A0B0D] font-mono text-xs text-[#EDEAE2]/85"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  data-proj-actions
                  className="min-h-[42px] flex flex-wrap items-center gap-3 pt-2"
                >
                  <a
                    href={selected.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-[#EDEAE2]/20 hover:border-[#FF4D00] font-mono text-xs text-[#EDEAE2] transition-colors"
                  >
                    <GithubLogoIcon className="h-4 w-4" />
                    {labels.code}
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#FF4D00]" />
                  </a>
                  {selected.live ? (
                    <a
                      href={selected.live}
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
            </div>
          ) : null}
        </div>
      </div>

      {/* Mobile & Tablet (< lg): Fluid Accordion */}
      <div className="lg:hidden divide-y divide-[#EDEAE2]/10">
        {projects.map((project, index) => {
          const isOpen = activeIndex === index;
          const indexCode = String(index + 1).padStart(2, "0");

          return (
            <div
              key={project.title}
              className={`transition-colors duration-200 ${
                isOpen ? "bg-[#0F1013]" : "hover:bg-[#EDEAE2]/[0.02]"
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setActiveIndex(isOpen ? -1 : index)}
                className="w-full text-left px-6 sm:px-10 py-5 flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-baseline gap-4 min-w-0">
                  <span
                    className={`font-mono text-xs tabular-nums shrink-0 ${
                      isOpen ? "text-[#FF4D00]" : "text-[#9A968E]"
                    }`}
                  >
                    {indexCode}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-serif text-2xl tracking-tight text-[#EDEAE2]">
                      {project.title}
                    </h3>
                    {project.subtitle ? (
                      <p className="font-mono text-[11px] text-[#9A968E] mt-0.5 uppercase tracking-wider">
                        {project.subtitle}
                      </p>
                    ) : null}
                  </div>
                </div>
                <ChevronRight
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 motion-reduce:transition-none ${
                    isOpen ? "rotate-90 text-[#FF4D00]" : "text-[#EDEAE2]"
                  }`}
                />
              </button>

              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0 pointer-events-none"
                }`}
                aria-hidden={!isOpen}
              >
                <div className="overflow-hidden">
                  <div className="px-6 sm:px-10 pb-7 pt-2 space-y-5">
                    <ProjectViewport
                      project={project}
                      projectIndex={index}
                      indexCode={indexCode}
                    />
                    <p className="text-sm text-[#EDEAE2]/85 leading-relaxed">
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
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={isOpen ? 0 : -1}
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
                          tabIndex={isOpen ? 0 : -1}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF4D00] hover:bg-[#ff621f] font-mono text-xs font-bold text-[#0A0B0D] transition-colors"
                        >
                          {labels.demo}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
