import { PrismaClient } from "@prisma/client";

export interface TaskContext {
  db: PrismaClient;
}

export interface AppTask {
  name: string;
  run(ctx: TaskContext): Promise<void>;
}
