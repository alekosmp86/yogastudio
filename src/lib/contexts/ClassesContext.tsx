"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { GymClass } from "@/types/classes/GymClass";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { http } from "../http";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { useToast } from "@/lib/contexts/ToastContext";
import { ToastType } from "@/enums/ToastType";

interface ClassesContextValue {
  classes: GymClass[];
  setClasses: React.Dispatch<React.SetStateAction<GymClass[]>>;
  addClass: (cls: GymClass) => void;
  addClasses: (cls: GymClass[]) => void;
  updateClass: (cls: GymClass) => void;
  removeClass: (id: number) => void;
}

const ClassesContext = createContext<ClassesContextValue | undefined>(
  undefined
);

export function ClassesProvider({
  children,
  initialClasses = [],
}: {
  children: ReactNode;
  initialClasses?: GymClass[];
}) {
  const { showToast } = useToast();
  const [classes, setClasses] = useState<GymClass[]>(initialClasses);

  const addClass = useCallback(
    (cls: GymClass) => setClasses((prev) => [...prev, cls]),
    []
  );

  const addClasses = useCallback(
    (cls: GymClass[]) => setClasses((prev) => (prev.length === 0 ? cls : prev)),
    []
  );

  const updateClass = useCallback(
    (updated: GymClass) =>
      setClasses((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      ),
    []
  );

  const removeClass = useCallback(
    (id: number) => setClasses((prev) => prev.filter((c) => c.id !== id)),
    []
  );

  // fetch once when provider mounts
  useEffect(() => {
    let mounted = true;

    const fetchClasses = async () => {
      try {
        const { message, data }: ApiResponse<GymClass[]> = await http.get<ApiResponse<GymClass[]>>("/owner/classes", ApiType.FRONTEND);

        if (!mounted) return;

        if (message === RequestStatus.ERROR) {
          showToast({
            message: "Error fetching classes",
            type: ToastType.ERROR,
          });
          return;
        }

        addClasses(data ?? []);
      } catch {
        showToast({
          message: "Error fetching classes",
          type: ToastType.ERROR,
        });
      }
    };

    fetchClasses();
    return () => {
      mounted = false;
    };
  }, [addClasses, showToast]);

  return (
    <ClassesContext.Provider
      value={{
        classes,
        setClasses,
        addClass,
        addClasses,
        updateClass,
        removeClass,
      }}
    >
      {children}
    </ClassesContext.Provider>
  );
}

export function useClasses() {
  const ctx = useContext(ClassesContext);
  if (!ctx) throw new Error("useClasses must be used inside a ClassesProvider");
  return ctx;
}
