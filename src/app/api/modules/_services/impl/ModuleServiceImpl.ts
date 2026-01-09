import { ModuleService } from "../ModuleService";
import { Modules } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class ModuleServiceImpl implements ModuleService {
    getModules(): Promise<Modules[]> {
        return prisma.modules.findMany();
    }

    getActiveModules(): Promise<Modules[]> {
        return prisma.modules.findMany({
            where: {
                isActive: true
            }
        });
    }
}