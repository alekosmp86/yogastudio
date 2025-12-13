"use client";

import { Activity, useState } from "react";
import MobileNavItem from "../shared/MobileNavItem";
import { usePathname } from "next/navigation";
import NavItem from "../shared/NavItem";
import Container from "../shared/Container";
import { NavBarItems } from "static/StaticMockData";
import { APPCONFIG } from "app/config";
import { Menu, X } from "lucide-react";
import LogoutButton from "../shared/LogoutButton";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();  
  const router = useRouter();

  return (
    <nav className='w-full border-b shadow-sm bg-theme-headings'>
      <Container className='flex h-16 items-center justify-between'>
        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className='md:hidden p-2 text-white'
        >
          {open ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
        </button>
        
        {/* Logo */}
        <div className='text-xl font-bold text-white cursor-pointer' onClick={() => router.push('/')}>
          {APPCONFIG.BUSINESS.name}
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
          <LogoutButton/>
        </div>

        <LogoutButton className='md:hidden'/>
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
