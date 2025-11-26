import { ToastProvider } from "@/components/shared/Toast";
import { ReactNode } from "react";
import { ClassesProvider } from "./ClassesContext";

function composeProviders(
  ...providers: Array<React.ComponentType<{ children: ReactNode }>>
) {
  return ({ children }: { children: ReactNode }) =>
    providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    );
}

export const AppProviders = composeProviders(
  ToastProvider,
  ClassesProvider
);