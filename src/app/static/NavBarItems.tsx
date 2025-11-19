import { Home, Calendar, BookmarkCheck, User } from "lucide-react";
import { NavBarLink } from "../types/NavBarLink";

export const NavBarItems: NavBarLink[] = [
  { id: 1, label: "Inicio", url: "/", icon: Home },
  { id: 2, label: "Clases", url: "/classes", icon: Calendar },
  { id: 3, label: "Reservas", url: "/reservations", icon: BookmarkCheck },
  { id: 4, label: "Perfil", url: "/profile", icon: User },
];
