import { removeSession } from "@/lib/utils";
import { NavBarLink } from "../types/NavBarLink";
import { Home, Calendar, BookmarkCheck, User, Power } from "lucide-react";

export const NavBarItems: NavBarLink[] = [
  { id: 1, label: "Home", url: "/customer/home", icon: Home },
  { id: 2, label: "Classes", url: "/customer/classes", icon: Calendar },
  {
    id: 3,
    label: "Reservations",
    url: "/customer/reservations",
    icon: BookmarkCheck,
  },
  { id: 4, label: "Profile", url: "/customer/profile", icon: User },
  { id: 5, label: "Logout", url: "/login", icon: Power, executeFn: () => removeSession() },
];
