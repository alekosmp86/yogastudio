import { ToastType } from "@/enums/ToastType";

export type ToastOptions = {
  type: ToastType;
  message: string;
  persistent?: boolean;   // NEW — stays visible until manually removed
  duration?: number;      // override timeout for non-persistent
};

export type Toast = {
  id: string;
  type: ToastType;
  message: string;
  persistent: boolean;
  duration: number;
};