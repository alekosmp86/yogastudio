"use client";

import { ComponentType, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Roles } from "@/enums/Roles";
import { validateToken } from "./utils";
import { ExecutionStatus } from "@/enums/ExecutionStatus";

type AllowedRole = Roles.CLIENT | Roles.OWNER;

/*export function withAuth(
  Component: React.ComponentType,
  allowedRole: AllowedRole
) {
  return function Protected({ ...props }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      const rawUser = localStorage.getItem("user");

      if (!token || !rawUser) {
        router.replace("/login");
        return;
      }

      let user;
      try {
        user = JSON.parse(rawUser);
      } catch {
        router.replace("/login");
        return;
      }

      // Role mismatch
      if (user.role !== allowedRole) {
        router.replace("/");
        return;
      }

      // (Optional) token validation with backend could go here
      validateToken(token, (status) => {
        if (status === ExecutionStatus.FAILED) {
          router.replace("/login");
        } else {
          setAuthorized(true);
        }
      });
    }, [router]);

    if (!authorized) return null; // or loading spinner

    return <Component {...props} />;
  };
}*/

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

      // Wrong role → redirect
      if (user.role !== role) {
        router.replace("/login");
        return;
      }

      // Allowed to continue
      setIsAllowed(true);
    }, [router]);

    if (!isAllowed) {
      return <p className="text-white">Checking access...</p>;
    }

    return <Layout {...props} />;
  };
}
