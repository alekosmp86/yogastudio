import { useEffect, useState } from "react";

// Track route initialization promises per module
const routeInitPromises = new Map<string, Promise<void>>();

export function setRouteInitPromise(module: string, promise: Promise<void>) {
  routeInitPromises.set(module, promise);
}

/**
 * Hook to wait for a module's routes to be bootstrapped before rendering.
 * Use this in pages that make API calls to module endpoints.
 *
 * @param module - The module name (e.g., "membership")
 * @returns boolean indicating if routes are ready
 */
export function useRouteBootstrap(module: string) {
  const [isReady, setIsReady] = useState(() => {
    const promise = routeInitPromises.get(module);
    return !promise; // If no promise exists, assume already bootstrapped
  });

  useEffect(() => {
    const promise = routeInitPromises.get(module);
    if (promise) {
      promise.then(() => setIsReady(true));
    }
  }, [module]);

  return isReady;
}
