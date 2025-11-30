"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { Toast, ToastOptions } from "@/types/ToastOptions";

type ToastContextType = {
  toasts: Toast[];
  showToast: (options: ToastOptions) => string;
  hideToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const showToast = useCallback(
    (options: ToastOptions) => {
      const id = crypto.randomUUID();

      const toast: Toast = {
        id,
        type: options.type,
        message: options.message,
        persistent: options.persistent ?? false,
        duration: options.duration ?? 3500,
      };

      setToasts((prev) => [...prev, toast]);

      if (!toast.persistent) {
        setTimeout(() => hideToast(id), toast.duration);
      }

      return id; // allow manual closing
    },
    [hideToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be inside <ToastProvider>");
  return ctx;
};
