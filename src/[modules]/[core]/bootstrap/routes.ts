import { MODULES } from "./modules";

let bootstrapped = false;

export function bootstrapRoutes() {
  if (bootstrapped) return;

  console.log("Bootstrapping modules' routes...");
  bootstrapped = true;

  for (const mod of MODULES) {
    mod.initRoutes?.();
  }
}
