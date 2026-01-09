import { MODULES } from "./modules";
import { prisma } from "@/lib/prisma";

let bootstrapped = false;

export async function bootstrapRoutes(module?: string) {
  if (bootstrapped || !module) return;

  console.log("Bootstrapping modules' routes...");
  bootstrapped = true;

  const isModuleActive = await prisma.modules.findFirst({
    where: {
      name: module,
      isActive: true
    }
  });

  if (!isModuleActive) return;

  MODULES.forEach((mod) => {
    if (module && mod.name !== module) return;
    mod.initRoutes?.();
  });
}
