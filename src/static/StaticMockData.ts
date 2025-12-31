import { NavBarLink } from "../types/NavBarLink";
import { Home, Calendar, BookmarkCheck, User } from "lucide-react";

export const NavBarItems: NavBarLink[] = [
  { id: 1, label: "home", url: "/customer/home", icon: Home },
  { id: 2, label: "classes", url: "/customer/classes", icon: Calendar },
  {
    id: 3,
    label: "reservations",
    url: "/customer/reservations",
    icon: BookmarkCheck,
  },
  { id: 4, label: "profile", url: "/customer/profile", icon: User },
];
