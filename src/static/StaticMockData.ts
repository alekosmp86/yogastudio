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
