"use client";

import { Roles } from "@/enums/Roles";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { session, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!session) {
      router.replace("/login");
      return;
    }

    if (session.user.role === Roles.CLIENT) {
      router.replace("/customer/home");
      return;
    }

    if (session.user.role === Roles.OWNER) {
      router.replace("/owner/dashboard");
      return;
    }
  }, [loading, session, router]);

  return <p className="text-white">Loading...</p>;
}
