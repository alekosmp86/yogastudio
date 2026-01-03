import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";
import { classInstanceService, userReservationService } from "app/api";
import { ApiUtils } from "app/api/utils/ApiUtils";

export async function GET() {
  try {
    const nextClass = await classInstanceService.getNextClass();
    return NextResponse.json(
      { message: RequestStatus.SUCCESS, data: nextClass },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: RequestStatus.ERROR, data: null },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const user = await ApiUtils.getSessionUser();
    const reservationMessage = await userReservationService.createReservation(Number(id), user);
    return NextResponse.json(
      { message: reservationMessage },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: RequestStatus.ERROR },
      { status: 500 }
    );
  }
}
