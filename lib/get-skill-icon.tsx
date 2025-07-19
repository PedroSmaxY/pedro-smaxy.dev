import { Code, Database, Palette, Smartphone } from "lucide-react";
import { FlowArrowIcon } from "@phosphor-icons/react/dist/ssr";

export const getSkillIcon = (categoryKey: string, className: string) => {
  const iconMap: Record<string, React.ComponentType<any>> = {
    backend: Code,
    frontend: Palette,
    database: Database,
    devops: FlowArrowIcon,
    mobile: Smartphone,
  };

  const Icon: React.ComponentType<any> =
    iconMap[categoryKey] || iconMap[categoryKey.toLowerCase()] || Code;

  return <Icon className={className} />;
};
