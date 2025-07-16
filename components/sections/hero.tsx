import { Download, MapPin, Phone } from "lucide-react";
import { Button } from "../ui/button";

export function Hero() {
  return (
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
          Desenvolvedor Full Stack curioso, com paixão por construir sistemas de
          alta performance, do back-end ao front-end. Experiência prática com
          Java, Spring Boot, Python, FastAPI, JavaScript e Next.js.
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
    );
}
