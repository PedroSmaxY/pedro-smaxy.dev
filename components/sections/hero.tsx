"use client";

import { Download, MapPin, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { PORTFOLIO_CONFIG } from "@/lib/config";
import Image from "next/image";

import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("portfolio.hero");

  const { profileImageUrl, cvDownloadUrl } = PORTFOLIO_CONFIG.links;
  const { name, phone } = PORTFOLIO_CONFIG.personal;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 sm:pt-20 xl:pt-0"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-900/10"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="mb-8">
          <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 p-1">
            <div className="w-full h-full rounded-full overflow-hidden bg-black">
              <Image
                src={profileImageUrl}
                alt={`${name} - Profile Image`}
                width={128}
                height={128}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
            {name}
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-purple-300 mb-4 font-semibold">
          {t("role")}
        </p>
        <div className="flex items-center justify-center gap-6 mb-8 text-gray-300">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-purple-400" />
            <span className="text-sm md:text-lg">{t("location")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-purple-400" />
            <span className="text-sm md:text-lg">{phone}</span>
          </div>
        </div>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          {t("description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3"
          >
            <a href={cvDownloadUrl} download>
              <Download className="mr-2 h-4 w-4" />
              {t("downloadLabel")}
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
            {t("projectsLabel")}
          </Button>
        </div>
      </div>
    </section>
  );
}
