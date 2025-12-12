import { NextResponse } from "next/server";
import { adminService } from "../..";

export async function POST() {
  try {
    const createdInstances = await adminService.generateDailyClasses();

    return NextResponse.json({
      success: true,
      createdCount: createdInstances.length,
      created: createdInstances,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}