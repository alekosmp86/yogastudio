import { LucideIcon } from "lucide-react";

export interface GymClass {
  id: string;
  name: string;
  time: string; // "09:00"
  instructor: string;
  reserved: number;
  capacity: number;
  icon: string;
}
