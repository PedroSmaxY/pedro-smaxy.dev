import { Badge } from "../ui/badge";

export type AboutProps = {
  title: string;
  paragraphs: string[];
  badges: string[];
  emoji?: string;
};

export function About({ title, paragraphs, badges, emoji = "👨‍💻" }: AboutProps) {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-black to-purple-950/10"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-lg text-gray-300 mb-6 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
            <div className="flex flex-wrap gap-3">
              {badges.map((badge, index) => (
                <Badge
                  key={index}
                  className="bg-purple-600 hover:bg-purple-700 transition-colors"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-lg flex items-center justify-center">
              <span className="text-6xl">{emoji}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
