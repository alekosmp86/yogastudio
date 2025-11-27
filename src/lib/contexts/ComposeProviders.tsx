import { ToastProvider } from "@/lib/contexts/ToastContext";
import { ReactNode } from "react";
import { ClassesProvider } from "./ClassesContext";
import { ScheduledClassesProvider } from "./ScheduledClassesContext";

function composeProviders(
  ...providers: Array<React.ComponentType<{ children: ReactNode }>>
) {
  return ({ children }: { children: ReactNode }) =>
    providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    );
}

export const AppProviders = composeProviders(ToastProvider, ClassesProvider, ScheduledClassesProvider);
