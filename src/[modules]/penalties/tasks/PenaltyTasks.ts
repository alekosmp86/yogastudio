import { AppTask } from "@/tasks/TaskType";
import { PrismaClient } from "@prisma/client";
import { PenaltiesModule } from "../penalties.module";

export const RegisterModuleTask: AppTask = {
  name: "penalties:register-module",

  async run({ db }: { db: PrismaClient }) {
    await db.modules.upsert({
      where: { name: PenaltiesModule.name },
      update: {},
      create: {
        name: PenaltiesModule.name,
        description: "penaltiesModuleDescription",
        isActive: true,
      },
    });
  },
};