import { MODULES } from "./modules";

let bootstrapped = false;

export function bootstrapRoutes(module?: string) {
  if (bootstrapped) return;

  console.log("Bootstrapping modules' routes...");
  bootstrapped = true;

  MODULES.forEach((mod) => {
    if (module && mod.name !== module) return;
    mod.initRoutes?.();
  });
}
