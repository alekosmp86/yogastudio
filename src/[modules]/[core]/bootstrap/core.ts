import { MODULES } from "./modules";

let bootstrapped = false;

export function bootstrapHooks() {
  if (bootstrapped) return;

  console.log("Bootstrapping modules' hooks...");
  bootstrapped = true;

  for (const module of MODULES) {
    module.initCore?.();
  }
}
