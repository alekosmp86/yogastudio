import { MODULES } from "./modules";

let bootstrapped = false;

export function bootstrapUI() {
  if (bootstrapped) return;

  console.log("Bootstrapping modules' UI...");
  bootstrapped = true;

  for (const module of MODULES) {
    module.initUI?.();
  }
}
