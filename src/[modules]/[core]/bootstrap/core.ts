import { Modules } from "@prisma/client";
import { MODULES } from "./modules";
import { prisma } from "@/lib/prisma";

let bootstrapPromise: Promise<void> | null = null;

export async function bootstrapHooks() {
  if (bootstrapPromise) return bootstrapPromise;

  bootstrapPromise = (async () => {
    console.log("Bootstrapping modules' hooks...");

    const activeModules = await prisma.modules.findMany({
      where: {
        isActive: true,
      },
    });

    const modulesToInitialize = MODULES.filter((mod) =>
      activeModules.some((module: Modules) => module.name === mod.name),
    );

    for (const mod of modulesToInitialize) {
      mod.initCore?.();
    }
  })();

  return bootstrapPromise;
}
