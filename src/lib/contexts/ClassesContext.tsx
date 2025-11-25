'use client';

import { createContext, useContext, useState, ReactNode } from "react";
import { GymClass } from "@/types/classes/GymClass";

interface ClassesContextValue {
  classes: GymClass[];
  setClasses: React.Dispatch<React.SetStateAction<GymClass[]>>;
  addClass: (cls: GymClass) => void;
  addClasses: (cls: GymClass[]) => void;
  updateClass: (cls: GymClass) => void;
  removeClass: (id: number) => void;
}

const ClassesContext = createContext<ClassesContextValue | undefined>(undefined);

export function ClassesProvider({ children, initialClasses = [] }: {
  children: ReactNode;
  initialClasses?: GymClass[];
}) {
  const [classes, setClasses] = useState<GymClass[]>(initialClasses);

  const addClass = (cls: GymClass) => setClasses(prev => [...prev, cls]);

  const addClasses = (cls: GymClass[]) => setClasses(cls);

  const updateClass = (updated: GymClass) =>
    setClasses(prev => prev.map(c => c.id === updated.id ? updated : c));

  const removeClass = (id: number) =>
    setClasses(prev => prev.filter(c => c.id !== id));

  return (
    <ClassesContext.Provider value={{ classes, setClasses, addClass, addClasses, updateClass, removeClass }}>
      {children}
    </ClassesContext.Provider>
  );
}

export function useClasses() {
  const ctx = useContext(ClassesContext);
  if (!ctx) throw new Error("useClasses must be used inside a ClassesProvider");
  return ctx;
}
