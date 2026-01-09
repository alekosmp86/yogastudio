import { MODULES } from "./modules";
import { prisma } from "@/lib/prisma";

const bootstrappedModules = new Set<string>();
let globalBootstrapped = false;

export async function bootstrapRoutes(module?: string) {
  if (module) {
    if (bootstrappedModules.has(module)) return;
  } else {
    if (globalBootstrapped) return;
  }

  console.log(
    `Bootstrapping modules' routes... ${
      module ? `(Module: ${module})` : "(Global)"
    }`
  );

  if (module) {
    const isModuleActive = await prisma.modules.findFirst({
      where: {
        name: module,
        isActive: true,
      },
    });

    if (!isModuleActive) return;

    const mod = MODULES.find((m) => m.name === module);
    if (mod) {
      mod.initRoutes?.();
      bootstrappedModules.add(module);
    }
  } else {
    // Global bootstrap (for all active modules)
    const activeModules = await prisma.modules.findMany({
      where: { isActive: true },
    });

    for (const mod of MODULES) {
      const isActive = activeModules.some((m) => m.name === mod.name);
      if (isActive && !bootstrappedModules.has(mod.name)) {
        mod.initRoutes?.();
        bootstrappedModules.add(mod.name);
      }
    }
    globalBootstrapped = true;
  }
}
