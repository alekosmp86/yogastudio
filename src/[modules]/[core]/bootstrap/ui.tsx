"use client";

import { useEffect } from "react";
import { MODULES } from "./modules";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ApiType } from "@/enums/ApiTypes";
import { Modules } from "@prisma/client";
import { RequestStatus } from "@/enums/RequestStatus";

export function ModuleUIBootstrap() {
  useEffect(() => {
    const initializeUI = async () => {
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
    };

    initializeUI();
  }, []);

  return null;
}
