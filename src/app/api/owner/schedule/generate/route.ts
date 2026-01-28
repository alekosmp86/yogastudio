import { adminService } from "app/api/admin";
import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await adminService.generateDailyClasses();
    return NextResponse.json(
      { message: RequestStatus.SUCCESS },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
}
