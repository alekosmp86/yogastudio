import { NextResponse } from "next/server";
import { scheduledTasks } from "./ScheduledTasks";
import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";
import { AdminServiceImpl } from "./(services)/impl/AdminServiceImpl";

const logger = new ConsoleLogger("ScheduledTasks");

export async function GET() {
  logger.log("Running scheduled tasks");
  const adminService = new AdminServiceImpl(logger);
  await adminService.runScheduledTasks();
  logger.log("Scheduled tasks completed");
  return NextResponse.json({ ok: true });
}
