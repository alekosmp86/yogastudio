import { NavBarLink } from "../types/NavBarLink";
import { Home, Calendar, BookmarkCheck, User } from "lucide-react";

export const NavBarItems: NavBarLink[] = [
  { id: 1, label: "Inicio", url: "/customer/home", icon: Home },
  { id: 2, label: "Clases", url: "/customer/classes", icon: Calendar },
  {
    id: 3,
    label: "Reservas",
    url: "/customer/reservations",
    icon: BookmarkCheck,
  },
  { id: 4, label: "Perfil", url: "/customer/profile", icon: User },
];

export const HOURS = Array.from({ length: 16 }, (_, i) => {
  const h = 6 + i;
  return `${h.toString().padStart(2, "0")}:00`;
});

export const WEEKDAYS = [
  { label: "Mon", date: "20" },
  { label: "Tue", date: "21" },
  { label: "Wed", date: "22" },
  { label: "Thu", date: "23" },
  { label: "Fri", date: "24" },
  { label: "Sat", date: "25" },
  { label: "Sun", date: "26" },
];

