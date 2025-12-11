'use client';

import { ToastProvider } from "@/lib/contexts/ToastContext";

export default function CustomerClientWrapper({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
