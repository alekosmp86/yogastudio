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
      // grab token
      const token = localStorage.getItem("token");

      // grab and parse user
      const rawUser = localStorage.getItem("user");
      let user = null;

      const expiresAt = localStorage.getItem("expiresAt");

      try {
        user = rawUser ? JSON.parse(rawUser) : null;
      } catch {
        user = null;
      }

      // Not logged in
      if (!token || !user) {
        router.replace("/login");
        return;
      }

      // Token expired
      if (expiresAt && new Date(expiresAt) < new Date()) {
        router.replace("/login");
        return;
      }

      // Wrong role → redirect
      if (user.role !== role) {
        router.replace("/login");
        return;
      }

      // Allowed to continue
      setIsAllowed(true);
    }, [router]);

    if (!isAllowed) {
      return <p className='text-white'>Checking access...</p>;
    }

    return <Layout {...props} />;
  };
}
