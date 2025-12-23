import { userReservationService } from "app/api";
import { NextResponse } from "next/server";
import { RequestStatus } from "@/enums/RequestStatus";
import { ConsoleLogger } from "app/api/logger/_services/impl/ConsoleLogger";
import { ApiUtils } from "app/api/utils/ApiUtils";

const logger = new ConsoleLogger("ReservationService");

type RequestParams = {
  params: Promise<{ id: string }>;
};

export async function DELETE(req: Request, { params }: RequestParams) {
  try {
    const user = await ApiUtils.getSessionUser();
    const { id } = await params;
    await userReservationService.cancelReservation(Number(id), user);
    return NextResponse.json({ message: RequestStatus.SUCCESS }, { status: 200 });
  } catch (error) {
    logger.error("Error canceling reservation:", error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
}