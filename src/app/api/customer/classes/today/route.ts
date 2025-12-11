import { ConsoleLogger } from "../../../logger/impl/ConsoleLogger";
import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";
import { customerClassesService } from "../../..";

const logger = new ConsoleLogger("CustomerController");

export async function GET() {
  try {
    const todayClasses = await customerClassesService.getTodayClasses();
    return NextResponse.json({
      message: RequestStatus.SUCCESS,
      data: todayClasses,
    });
  } catch (error) {
    logger.error("Error fetching classes:", error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
}
