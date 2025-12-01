'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { validateToken } from "@/lib/utils";
import { ExecutionStatus } from "@/enums/ExecutionStatus";

export default function VerifyMaginLink() {
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

  return <p>Verifying magic link...</p>;
}