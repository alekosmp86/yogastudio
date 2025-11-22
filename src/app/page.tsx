"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/User";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Grab data safely
    const token = localStorage.getItem("token");
    const rawUser = localStorage.getItem("user");

    let user: User | null = null;
    try {
      user = rawUser ? JSON.parse(rawUser) : null;
    } catch {
      user = null;
    }

    // Redirect logic
    if (!token || !user) {
      router.replace("/login");
      return;
    }

    if (user.role === "CLIENT") {
      router.replace("/customer/home");
      return;
    }

    if (user.role === "OWNER") {
      router.replace("/owner/dashboard");
      return;
    }
  }, [router]);

  return <p className="text-white">Loading...</p>;
}
