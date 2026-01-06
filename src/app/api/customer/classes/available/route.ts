import { ConsoleLogger } from "../../../logger/_services/impl/ConsoleLogger";
import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";
import { customerClassesService } from "../../..";
import { CoreHooks } from "@/enums/CoreHooks";
import { runHooks } from "@/lib/hooks/hookRegistry";

const logger = new ConsoleLogger("CustomerController");

export async function GET() {
  try {
    const classesList = await customerClassesService.getClassesList();

    const result = await runHooks(CoreHooks.postFetchAllAvailableClasses, classesList);

    return NextResponse.json({
      message: RequestStatus.SUCCESS,
      data: result,
    });
  } catch (error) {
    logger.error("Error fetching classes:", error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
}
