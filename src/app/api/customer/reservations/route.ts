import { userReservationService } from "app/api";
import { ConsoleLogger } from "app/api/logger/_services/impl/ConsoleLogger";
import { NextResponse } from "next/server";
import { ApiUtils } from "app/api/utils/ApiUtils";
import { RequestStatus } from "@/enums/RequestStatus";

const logger = new ConsoleLogger("ReservationService");

export async function GET(req: Request) {
  try {
    const user = await ApiUtils.getSessionUser();
    const reservations = await userReservationService.getReservations(user.id);
    return NextResponse.json({message: RequestStatus.SUCCESS, data: reservations});
  } catch (error) {
    logger.error("Error fetching reservations:", error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await ApiUtils.getSessionUser();
    const { classId } = await req.json();

    logger.log("Creating reservation for class:", classId);
    const result = await userReservationService.createReservation(classId, user);
    logger.log(`Reservation processed: ${result}`);
    return NextResponse.json({ message: result }, { status: 200 });
  } catch (error) {
    logger.error("Error creating reservation:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
