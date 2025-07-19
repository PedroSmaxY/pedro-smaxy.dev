import { Code, Database, Palette, Smartphone } from "lucide-react";
import { FlowArrowIcon } from "@phosphor-icons/react/dist/ssr";

export const getSkillIcon = (categoryName: string, className: string) => {
  const iconMap: Record<string, any> = {
    backend: Code,
    frontend: Palette,
    database: Database,
    mobile: Smartphone,
    "devops & tools": FlowArrowIcon,
  };

  const Icon: React.ElementType = iconMap[categoryName.toLowerCase()] || Code;

  return <Icon className={className} />;
};
