"use client";

import { useEffect, useState, ReactNode } from "react";
import { MODULES } from "./modules";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ApiType } from "@/enums/ApiTypes";
import { Modules } from "@prisma/client";
import { RequestStatus } from "@/enums/RequestStatus";
import { setModuleInitPromise } from "@/lib/hooks/useUISlot";

let modulesInitialized = false;
let initializationPromise: Promise<void> | null = null;

async function initializeModules() {
  if (modulesInitialized) return;

  const { message, data } = await http.get<ApiResponse<Modules[]>>(
    "/modules",
    ApiType.FRONTEND
  );

  if (message === RequestStatus.SUCCESS && data) {
    const modsToInitialize = MODULES.filter((mod) =>
      data.some((module) => module.name === mod.name)
    );

    for (const mod of modsToInitialize) {
      mod.initUI?.();
    }
  }

  modulesInitialized = true;
}

export function ModuleUIBootstrap({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(modulesInitialized);

  useEffect(() => {
    if (!initializationPromise) {
      initializationPromise = initializeModules();
      setModuleInitPromise(initializationPromise);
    }

    initializationPromise.then(() => {
      setIsReady(true);
    });
  }, []);

  // Block rendering children until modules are initialized
  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}
