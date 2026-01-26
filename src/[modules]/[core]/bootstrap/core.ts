import { Modules } from "@prisma/client";
import { MODULES } from "./modules";
import { prisma } from "@/lib/prisma";

let bootstrapped = false;

export async function bootstrapHooks() {
  if (bootstrapped) return;

  console.log("Bootstrapping modules' hooks...");
  bootstrapped = true;

  const activeModules = await prisma.modules.findMany({
    where: {
      isActive: true
    }
  });

  const modulesToInitialize = MODULES.filter((mod) =>
    activeModules.some((module: Modules) => module.name === mod.name)
  );

  for (const mod of modulesToInitialize) {
    mod.initCore?.();
  }
}
