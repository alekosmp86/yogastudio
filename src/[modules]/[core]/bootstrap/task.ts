import { MODULES } from "./modules";

let bootstrapped = false;

export function bootstrap() {
  if (bootstrapped) return;

  console.log("Bootstrapping modules...");
  bootstrapped = true;

  for (const module of MODULES) {
    module.initTasks?.();
  }
}
