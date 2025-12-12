import { LucideIcon } from "lucide-react";

export type NavBarLink = {
  id: number;
  label: string;
  url: string;
  executeFn?: () => void;
  icon: LucideIcon;
};
