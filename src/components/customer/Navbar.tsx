"use client";

import { Activity, useState } from "react";
import MobileNavItem from "../shared/MobileNavItem";
import { usePathname } from "next/navigation";
import NavItem from "../shared/NavItem";
import Container from "../shared/Container";
import { NavBarItems } from "static/StaticMockData";
import { APPCONFIG } from "app/config";
import { Menu, Power, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { removeSession } from "@/lib/utils";

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const signOut = async () => {
    await removeSession();
    router.push("/login");
  };

  return (
    <nav className='w-full border-b shadow-sm bg-theme-headings'>
      <Container className='flex h-16 items-center justify-between'>
        {/* Logo */}
        <div className='text-xl font-bold text-white'>
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
          <Power
            className='text-white h-5 w-5 hover:scale-110 transition cursor-pointer hover:bg-gray-200 hover:text-black rounded-full'
            onClick={() => signOut()}
          />
        </div>

        {/* Mobile toggle */}
        <div className='flex items-center md:hidden'>
          <button
            onClick={() => setOpen(!open)}
            className='p-2 text-white'
          >
            {open ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
          <Power
            className='text-white h-5 w-5 hover:scale-110 transition cursor-pointer hover:bg-gray-200 hover:text-black rounded-full'
            onClick={() => signOut()}
          />
        </div>
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
