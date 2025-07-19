"use client";

import { motion, Variants } from "framer-motion";
import { Download, MapPin, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { PORTFOLIO_CONFIG } from "@/lib/config";
import Image from "next/image";
import { useTranslations } from "next-intl";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

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

      <motion.div
        className="container mx-auto px-6 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-8" variants={itemVariants}>
          <motion.div
            className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 p-1"
            variants={imageVariants}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-black">
              <Image
                src={profileImageUrl}
                alt={`${name} - Profile Image`}
                width={256}
                height={256}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
            {name}
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-purple-300 mb-4 font-semibold"
          variants={itemVariants}
        >
          {t("role")}
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-6 mb-8 text-gray-300"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-purple-400" />
            <span className="text-sm md:text-lg">{t("location")}</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-purple-400" />
            <span className="text-sm md:text-lg">{phone}</span>
          </div>
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          {t("description")}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3"
            >
              <a href={cvDownloadUrl} download>
                <Download className="mr-2 h-4 w-4" />
                {t("downloadLabel")}
              </a>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
