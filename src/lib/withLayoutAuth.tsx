"use client";

import { ComponentType, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Roles } from "@/enums/Roles";

type Role = Roles.CLIENT | Roles.OWNER;

export function withLayoutAuth<T extends object>(
  Layout: ComponentType<T>,
  role: Role
) {
  return function LayoutGuard(props: T & { children?: ReactNode }) {
    const router = useRouter();
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(() => {
      async function check() {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include"
        });

        if (!res.ok) {
          router.replace("/login");
          return;
        }

        const data = await res.json();

        if (data.user.role !== role) {
          router.replace("/login");
          return;
        }

        setIsAllowed(true);
      }

      check();
    }, [router]);

    if (!isAllowed) {
      return <p className='text-white'>Checking access...</p>;
    }

    return <Layout {...props} />;
  };
}
