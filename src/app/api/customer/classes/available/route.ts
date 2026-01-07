import { ConsoleLogger } from "../../../logger/_services/impl/ConsoleLogger";
import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";
import { customerClassesService } from "../../..";
import { CoreHooks } from "@/modules/[core]/CoreHooks";
import { hookRegistry } from "@/lib/hooks";
import { bootstrap } from "@/modules/[core]/ModulesBootstrap";

const logger = new ConsoleLogger("CustomerController");

export async function GET() {
  // enable modules' hooks
  bootstrap();

  try {
    await hookRegistry.runHooks(
      CoreHooks.beforeFetchAllAvailableClasses,
      "before",
      null
    );

    const classesList = await customerClassesService.getClassesList();

    const result = await hookRegistry.runHooks(
      CoreHooks.afterFetchAllAvailableClasses,
      "after",
      classesList
    );

    return NextResponse.json({
      message: RequestStatus.SUCCESS,
      data: result,
    });
  } catch (error) {
    logger.error("Error fetching classes:", error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
}
