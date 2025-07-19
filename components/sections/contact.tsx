"use client";

import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

export function Contact() {
  const links = {
    linkedin: "https://www.linkedin.com/in/pedrohenriquenv/",
    email: "pedrohenrique.nv@icloud.com",
    github: "https://github.com/PedroSmaxY",
  };

  const t = useTranslations("portfolio.contact");

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          {t("title")}
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3"
            onClick={() =>
              window.open(
                `mailto:${links.email}`,
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <Mail className="mr-2 h-4 w-4" />
            {links.email}
          </Button>
          <Button
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 bg-transparent"
            onClick={() =>
              window.open(links.linkedin, "_blank", "noopener,noreferrer")
            }
          >
            <LinkedinLogoIcon className="mr-2 h-4 w-4" />
            LinkedIn
          </Button>
          <Button
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 bg-transparent"
            onClick={() =>
              window.open(links.github, "_blank", "noopener,noreferrer")
            }
          >
            <GithubLogoIcon className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}
