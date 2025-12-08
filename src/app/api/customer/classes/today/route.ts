import { ConsoleLogger } from "../../../logger/impl/ConsoleLogger";
import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";
import { customerService } from "../../..";

const logger = new ConsoleLogger("CustomerController");

export async function GET() {
  try {
    logger.log("Fetching classes...");
    const todayClasses = await customerService.getTodayClasses();
    logger.log(`Classes fetched successfully: ${todayClasses}`);
    return NextResponse.json({
      message: RequestStatus.SUCCESS,
      data: todayClasses,
    });
  } catch (error) {
    logger.error("Error fetching classes:", error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
}
