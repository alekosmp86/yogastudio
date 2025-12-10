"use client";

import { Activity, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import MobileNavItem from "../shared/MobileNavItem";
import { usePathname } from "next/navigation";
import NavItem from "../shared/NavItem";
import Container from "../shared/Container";
import { NavBarItems } from "static/StaticMockData";
import { APPCONFIG } from "app/config";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className='w-full border-b shadow-sm bg-theme-headings'>
      <Container className='flex h-16 items-center justify-between'>
        {/* Logo */}
        <div className='text-xl font-bold text-white'>
          {APPCONFIG.BUSINESS_NAME}
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center gap-6'>
          {NavBarItems.map((item) => (
            <NavItem
              key={item.id}
              label={item.label}
              href={item.url}
              Icon={item.icon}
              active={pathname === item.url}
            />
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className='md:hidden p-2 text-white'
        >
          {open ? (
            <XMarkIcon className='h-6 w-6' />
          ) : (
            <Bars3Icon className='h-6 w-6' />
          )}
        </button>
      </Container>

      {/* Mobile Menu */}
      <Activity mode={open ? "visible" : "hidden"}>
        <div className='md:hidden border-t bg-white'>
          {NavBarItems.map((item) => (
            <MobileNavItem
              key={item.id}
              label={item.label}
              href={item.url}
              Icon={item.icon}
              active={pathname === item.url}
            />
          ))}
        </div>
      </Activity>
    </nav>
  );
}
