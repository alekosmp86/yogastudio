import { reservationService } from "app/api";
import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";
import { NextResponse } from "next/server";
import { ApiUtils } from "app/api/utils/ApiUtils";

const logger = new ConsoleLogger("ReservationService");

export async function POST(req: Request) {
  try {
    const user = await ApiUtils.getSessionUser();
    const { classId } = await req.json();

    logger.log("Creating reservation for class:", classId);
    const result = await reservationService.createReservation(classId, user.id);
    logger.log(`Reservation processed: ${result}`);
    return NextResponse.json({ message: result }, { status: 200 });
  } catch (error) {
    logger.error("Error creating reservation:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
