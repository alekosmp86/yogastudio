import { RequestStatus } from "@/enums/RequestStatus";
import { moduleService } from "..";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const modules = await moduleService.getActiveModules();
    return NextResponse.json(
      { message: RequestStatus.SUCCESS, data: modules },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching modules:", error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
}
