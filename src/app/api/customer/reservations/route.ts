import { RequestStatus } from "@/enums/RequestStatus";
import { reservationService } from "app/api";
import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { SessionUser } from "@/types/SessionUser";

const logger = new ConsoleLogger("ReservationService");

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) {
      return NextResponse.json(
        { message: RequestStatus.UNAUTHORIZED },
        { status: 401 }
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload }: {payload: {user: SessionUser}} = await jwtVerify(session, secret);

    const { classId } = await req.json();

    logger.log("Creating reservation for class:", classId);
    const result = await reservationService.createReservation(classId, payload.user.id);
    logger.log(`Reservation processed: ${result}`);
    return NextResponse.json({ message: result }, { status: 200 });
  } catch (error) {
    logger.error("Error creating reservation:", error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
}
