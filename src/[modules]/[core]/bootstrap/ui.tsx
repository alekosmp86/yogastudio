"use client";

import { useEffect, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { MODULES } from "./modules";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ApiType } from "@/enums/ApiTypes";
import { Modules } from "@prisma/client";
import { RequestStatus } from "@/enums/RequestStatus";
import { setModuleInitPromise } from "@/lib/hooks/useUISlot";
import { PUBLIC_PATHS } from "middleware";

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
  const pathname = usePathname();
  const isPublicRoute = PUBLIC_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  const [isReady, setIsReady] = useState(modulesInitialized || isPublicRoute);

  useEffect(() => {
    // Skip module initialization on public routes
    if (isPublicRoute) {
      return;
    }

    if (!initializationPromise) {
      initializationPromise = initializeModules();
      setModuleInitPromise(initializationPromise);
    }

    initializationPromise.then(() => {
      setIsReady(true);
    });
  }, [isPublicRoute]);

  // Block rendering children until modules are initialized (or on public routes)
  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}
