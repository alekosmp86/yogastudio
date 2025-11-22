"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthVerifyPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  useEffect(() => {
    if (!token) return;

    async function verify() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/auth/token-validation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
          credentials: "include", // if using cookies
        }
      );

      if (!response.ok) {
        router.push("/login");
        return;
      }

      const data = await response.json();

      // Store session (choose your system)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/"); // go home
    }

    verify();
  }, [router, token]);

  return <p className='text-white'>Verifying magic link...</p>;
}
