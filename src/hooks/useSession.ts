"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Roles } from "@/enums/Roles";

type SessionResponse = {
  authenticated: boolean;
  user: {
    id: number;
    email: string;
    role: Roles;
    name: string;
  };
};

export function useSession(requiredRole?: Roles) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<SessionResponse | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          router.replace("/login");
          return;
        }

        const data: SessionResponse = await res.json();

        if (!data.authenticated) {
          router.replace("/login");
          return;
        }

        if (requiredRole && data.user.role !== requiredRole) {
          router.replace("/login");
          return;
        }

        setSession(data);
        setLoading(false);
      } catch (e) {
        router.replace("/login");
      }
    }

    load();
  }, [router, requiredRole]);

  return { loading, session };
}
