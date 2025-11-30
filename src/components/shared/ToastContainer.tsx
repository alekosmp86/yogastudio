"use client";

import { X, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";
import clsx from "clsx";
import { ToastType } from "@/enums/ToastType";
import { useToast } from "@/lib/contexts/ToastContext";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const icon = (type: ToastType) => {
    switch (type) {
      case ToastType.SUCCESS:
        return <CheckCircle className='w-5 h-5 text-green-600' />;
      case ToastType.ERROR:
        return <XCircle className='w-5 h-5 text-red-600' />;
      case ToastType.WARNING:
        return <AlertTriangle className='w-5 h-5 text-yellow-600' />;
      default:
        return <Info className='w-5 h-5 text-blue-600' />;
    }
  };

  return (
    <div className='fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none'>
      {toasts.map((t) => (
        <div
          key={t.id}
          className={clsx(
            "flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border pointer-events-auto animate-toast-in text-sm",
            {
              "bg-green-100 border-green-500 text-green-900":
                t.type === ToastType.SUCCESS,
              "bg-red-100 border-red-500 text-red-900":
                t.type === ToastType.ERROR,
              "bg-yellow-100 border-yellow-500 text-yellow-900":
                t.type === ToastType.WARNING,
              "bg-blue-100 border-blue-500 text-blue-900":
                t.type === ToastType.INFO,
            }
          )}
          onClick={() => removeToast(t.id)}
        >
          {icon(t.type)}
          <span>{t.message}</span>
          <X className='w-4 h-4 opacity-70' />
        </div>
      ))}
    </div>
  );
}
