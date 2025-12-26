import { RequestStatus } from "@/enums/RequestStatus";
import { ownerReservationService } from "app/api";
import { NextResponse } from "next/server";

type RequestParams = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  req: Request,
  { params }: RequestParams
) {
  const { id } = await params;
  const { attended, userId } = await req.json();

  try {
    await ownerReservationService.updateAttendance(Number(id), attended, userId);
    return NextResponse.json(
      { message: RequestStatus.SUCCESS },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating reservation attendance:", error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
}
