'use client';

import { ReactNode } from "react";
import { ClassesProvider } from "./ClassesContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ClassesProvider>
      {children}
    </ClassesProvider>
  );
}
