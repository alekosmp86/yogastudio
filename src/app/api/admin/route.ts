import { NextResponse } from "next/server";
import { adminService } from ".";
import { RequestStatus } from "@/enums/RequestStatus";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response(RequestStatus.UNAUTHORIZED, {
        status: 401,
      });
    }
    
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
