import { NextResponse } from "next/server";
import { adminService } from ".";

export async function GET() {
  try {
    await adminService.runScheduledTasks();
    return NextResponse.json({ message: "Scheduled tasks completed" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
