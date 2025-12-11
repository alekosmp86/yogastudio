import { NextResponse } from "next/server";
import { scheduledTasks } from "./ScheduledTasks";
import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";

const logger = new ConsoleLogger("ScheduledTasks");

export async function GET() {
  for (const task of scheduledTasks) {
    logger.log(`Running task: ${task.taskName}`);
    await task.run();
    logger.log(`Task ${task.taskName} completed`);
  }
  return NextResponse.json({ ok: true });
}
