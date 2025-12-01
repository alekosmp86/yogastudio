"use client";

import { Suspense } from "react";
import VerifyMaginLink from "@/components/public/VerifyMaginLink";

export default function AuthVerifyPage() {
  return (
    <Suspense fallback={<p className='text-white'>Verifying magic link...</p>}>
      <VerifyMaginLink />
    </Suspense>
  );
}
