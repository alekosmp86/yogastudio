"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function MagicLoginPage() {
  const params = useSearchParams();
  const token = params.get("token");

  useEffect(() => {
    if (!token) return;

    fetch("/api/auth/verify-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    // No redirect here — route handler handles it
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Validating your login…</p>
    </div>
  );
}
