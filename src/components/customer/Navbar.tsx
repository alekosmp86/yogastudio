"use client";

import { Activity, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import MobileNavItem from "../shared/MobileNavItem";
import { usePathname } from "next/navigation";
import NavItem from "../shared/NavItem";
import Container from "../shared/Container";
import { NavBarItems } from "static/StaticMockData";
import { APPCONFIG } from "app/config";
import { Power } from "lucide-react";
import { http } from "@/lib/http";
import { ApiType } from "@/enums/ApiTypes";
import { useRouter } from "next/navigation";
import Button from "../shared/Button";

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const signOut = async () => {
    await http.post("/auth/logout", ApiType.FRONTEND);
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
              executeFn={item.executeFn}
            />
          ))}
          <Power
            className='text-white h-5 w-5 hover:scale-110 transition cursor-pointer hover:bg-gray-200 hover:text-black rounded-full'
            onClick={() => signOut()}
          />
        </div>

        {/* Mobile toggle */}
        <Button
          variant='ghost'
          onClick={() => setOpen(!open)}
          className='md:hidden p-2 text-white'
        >
          {open ? (
            <XMarkIcon className='h-6 w-6' />
          ) : (
            <Bars3Icon className='h-6 w-6' />
          )}
        </Button>
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
              executeFn={item.executeFn}
            />
          ))}
        </div>
      </Activity>
    </nav>
  );
}
