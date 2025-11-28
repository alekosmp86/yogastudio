"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ScheduledClass } from "@/types/schedule/ScheduledClass";
import { http } from "@/lib/http";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { ApiResponse } from "@/types/requests/ApiResponse";

interface ScheduledClassesContextValue {
  scheduledClasses: ScheduledClass[];
  setScheduledClasses: React.Dispatch<React.SetStateAction<ScheduledClass[]>>;
}

const ScheduledClassesContext = createContext<ScheduledClassesContextValue | undefined>(undefined);

export function ScheduledClassesProvider({
  children,
  initialScheduledClasses = [],
}: {
  children: ReactNode;
  initialScheduledClasses?: ScheduledClass[];
}) {
  const [scheduledClasses, setScheduledClasses] = useState<ScheduledClass[]>(initialScheduledClasses);

  useEffect(() => {
      const fetchScheduleGrid = async () => {
        const { message, data } = await http.get<ApiResponse<ScheduledClass[]>>(
          "/owner/schedule",
          ApiType.FRONTEND
        );
        
        if (message === RequestStatus.SUCCESS) {
          setScheduledClasses(data || []);
        }
      };
      fetchScheduleGrid();
    }, []);

  return (
    <ScheduledClassesContext.Provider
      value={{
        scheduledClasses,
        setScheduledClasses,
      }}
    >
      {children}
    </ScheduledClassesContext.Provider>
  );
}

export function useScheduledClasses() {
  const ctx = useContext(ScheduledClassesContext);
  if (!ctx) throw new Error("useScheduledClasses must be used inside a ScheduledClassesProvider");
  return ctx;
}
