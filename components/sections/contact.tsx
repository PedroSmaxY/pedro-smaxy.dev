import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { PORTFOLIO_CONFIG } from "@/lib/config";

export function Contact() {
  const { linkedinUrl, githubUrl } = PORTFOLIO_CONFIG.links;
  const { email } = PORTFOLIO_CONFIG.personal;

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
            asChild
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3"
          >
            <a href={`mailto:${email}`}>
              <Mail className="mr-2 h-4 w-4" />
              {email}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 bg-transparent"
          >
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <LinkedinLogoIcon className="mr-2 h-4 w-4" />
              LinkedIn
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 bg-transparent"
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <GithubLogoIcon className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
