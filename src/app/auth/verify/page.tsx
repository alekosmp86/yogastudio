"use client";

import { ExecutionStatus } from "@/enums/ExecutionStatus";
import { validateToken } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthVerifyPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  useEffect(() => {
    if (!token) return;
    validateToken(token, (status) => {
      if (status === ExecutionStatus.FAILED) {
        router.push("/login");
      } else {
        router.push("/");
      }
    });
  }, [router, token]);

  return <p className='text-white'>Verifying magic link...</p>;
}
