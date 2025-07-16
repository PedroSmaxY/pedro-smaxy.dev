export type HeaderProps = {
  name: string;
  navItems: {
    start: string;
    about: string;
    experience: string;
    projects: string;
    skills: string;
    contact: string;
  };
};

export function Header({ name, navItems }: HeaderProps) {
  return (
    <header>
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-purple-900/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              {name}
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#home"
                className="hover:text-purple-400 transition-colors"
              >
                {navItems.start}
              </a>
              <a
                href="#about"
                className="hover:text-purple-400 transition-colors"
              >
                {navItems.about}
              </a>
              <a
                href="#experience"
                className="hover:text-purple-400 transition-colors"
              >
                {navItems.experience}
              </a>
              <a
                href="#projects"
                className="hover:text-purple-400 transition-colors"
              >
                {navItems.projects}
              </a>
              <a
                href="#skills"
                className="hover:text-purple-400 transition-colors"
              >
                {navItems.skills}
              </a>
              <a
                href="#contact"
                className="hover:text-purple-400 transition-colors"
              >
                {navItems.contact}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
