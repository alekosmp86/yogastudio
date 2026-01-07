import { pageRegistry } from "@/lib/hooks";
import { MODULES } from "./modules";

let bootstrapped = false;

export function bootstrapPages() {
  if (bootstrapped) return;

  console.log("Bootstrapping modules' pages...");
  bootstrapped = true;

  for (const module of MODULES) {
    module.pages?.forEach((page) => {
      pageRegistry.registerPage(module.name, page.path, page.component);
    });
  }
}
