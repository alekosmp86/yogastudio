import { useEffect, useState } from "react";
import { uiRegistry, UISlot } from "@/lib/registry/uiRegistry";

// Import the initialization promise from ModuleUIBootstrap
let initPromise: Promise<void> | null = null;

export function setModuleInitPromise(promise: Promise<void>) {
  initPromise = promise;
}

/**
 * Hook to resolve UI components from a slot after modules are initialized.
 * Waits for the actual module initialization to complete.
 */
export function useUISlot<S extends UISlot>(slot: S) {
  const [isReady, setIsReady] = useState(() => initPromise === null);

  useEffect(() => {
    if (initPromise) {
      initPromise.then(() => setIsReady(true));
    }
  }, []);

  return isReady ? uiRegistry.resolveUI(slot) : [];
}
