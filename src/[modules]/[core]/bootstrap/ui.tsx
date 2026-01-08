"use client";

import { useEffect } from "react";
import { MODULES } from "./modules";

export function ModuleUIBootstrap() {
  useEffect(() => {
    for (const mod of MODULES) {
      mod.initUI?.();
    }
  }, []);

  return null;
}
