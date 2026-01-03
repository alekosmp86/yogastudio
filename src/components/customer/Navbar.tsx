"use client";

import { Activity, useState } from "react";
import MobileNavItem from "../shared/MobileNavItem";
import { usePathname } from "next/navigation";
import NavItem from "../shared/NavItem";
import Container from "../shared/Container";
import { NavBarItems } from "static/StaticMockData";
import { Menu, X } from "lucide-react";
import LogoutButton from "../shared/LogoutButton";
import { useRouter } from "next/navigation";
import { useAppPreferences } from "@/lib/contexts/AppPreferencesContext";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { getPreferenceByName } = useAppPreferences();

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-gradient-to-b from-custom-200 to-custom-400 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-lg p-2 text-white transition hover:bg-white/10"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer text-lg font-semibold tracking-tight text-white"
        >
          {getPreferenceByName<string>("businessName")}
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          {NavBarItems.map((item) => (
            <NavItem
              key={item.id}
              label={t(item.label)}
              href={item.url}
              Icon={item.icon}
              active={pathname === item.url}
            />
          ))}

          <div className="ml-2">
            <LogoutButton />
          </div>
        </div>

        {/* Mobile logout */}
        <LogoutButton className="md:hidden" />
      </Container>

      {/* Mobile menu */}
      <Activity mode={open ? "visible" : "hidden"}>
        <div className="md:hidden border-t border-primary-900/10 bg-white shadow-sm">
          <div className="flex flex-col divide-y divide-primary-900/10">
            {NavBarItems.map((item) => (
              <MobileNavItem
                key={item.id}
                label={t(item.label)}
                href={item.url}
                Icon={item.icon}
                active={pathname === item.url}
              />
            ))}
          </div>
        </div>
      </Activity>
    </nav>
  );
}
