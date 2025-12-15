import { userReservationService } from "app/api";
import { NextResponse } from "next/server";
import { RequestStatus } from "@/enums/RequestStatus";
import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";

const logger = new ConsoleLogger("ReservationService");

type RequestParams = {
  params: Promise<{ id: string }>;
};

export async function DELETE(req: Request, { params }: RequestParams) {
  try {
    const { id } = await params;
    await userReservationService.cancelReservation(Number(id));
    return NextResponse.json({ message: RequestStatus.SUCCESS }, { status: 200 });
  } catch (error) {
    logger.error("Error canceling reservation:", error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
}