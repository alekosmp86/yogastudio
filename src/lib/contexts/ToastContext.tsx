"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { CheckCircle, AlertTriangle, Info, XCircle, X } from "lucide-react";
import clsx from "clsx";
import { ToastType } from "@/enums/ToastType";

export type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = ToastType.INFO) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
  }, []);

  const removeToast = (id: number) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  const iconFor = (type: ToastType) => {
    switch (type) {
      case ToastType.SUCCESS:
        return <CheckCircle className='w-5 h-5 text-brand-200' />;
      case ToastType.ERROR:
        return <XCircle className='w-5 h-5 text-red-300' />;
      case ToastType.WARNING:
        return <AlertTriangle className='w-5 h-5 text-yellow-300' />;
      default:
        return <Info className='w-5 h-5 text-brand-200' />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className='fixed top-4 right-4 z-50 space-y-3'>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={clsx(
              "flex items-center gap-3 px-4 py-3 rounded-lg shadow-card border cursor-pointer animate-toast-in hover:brightness-105 transition text-sm",
              {
                "bg-success-soft border-green-500 text-green-100":
                  toast.type === ToastType.SUCCESS,
                "bg-error-soft border-red-500 text-red-100":
                  toast.type === ToastType.ERROR,
                "bg-warning-soft border-yellow-500 text-yellow-100":
                  toast.type === ToastType.WARNING,
                "bg-info-soft border-blue-500 text-blue-100":
                  toast.type === ToastType.INFO,
              }
            )}
          >
            {iconFor(toast.type)}
            <span>{toast.message}</span>
            <X className='w-4 h-4 opacity-70' />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
