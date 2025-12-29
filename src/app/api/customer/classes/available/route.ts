import { ConsoleLogger } from "../../../logger/_services/impl/ConsoleLogger";
import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";
import { customerClassesService } from "../../..";

const logger = new ConsoleLogger("CustomerController");

export async function GET() {
  try {
    const classesList = await customerClassesService.getClassesList();
    return NextResponse.json({
      message: RequestStatus.SUCCESS,
      data: classesList,
    });
  } catch (error) {
    logger.error("Error fetching classes:", error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
}
