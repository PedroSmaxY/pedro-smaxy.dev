import { Bot, Code, Cpu, Layers, Terminal } from "lucide-react";

export const getSkillIcon = (categoryKey: string, className: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    systems: Cpu,
    ai: Bot,
    backend: Code,
    frontend: Layers,
    devops: Terminal,
  };

  const Icon =
    iconMap[categoryKey] || iconMap[categoryKey.toLowerCase()] || Code;

  return <Icon className={className} />;
};
