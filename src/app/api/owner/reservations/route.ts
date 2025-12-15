import { ownerReservationService } from "app/api";
import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const targetDate = searchParams.get("targetDate");

    try {
      const reservations = await ownerReservationService.getReservations(targetDate!);
      return NextResponse.json({message: RequestStatus.SUCCESS, data: reservations}, {status: 200});
    } catch (error) {
        console.error('Error fetching reservations:', error);
        return NextResponse.json({message: RequestStatus.ERROR, data: []}, {status: 500});
    }
}