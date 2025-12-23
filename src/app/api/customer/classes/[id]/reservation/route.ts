import { NextResponse } from "next/server";
import { RequestStatus } from "@/enums/RequestStatus";
import { userReservationService } from "app/api";
import { ApiUtils } from "app/api/utils/ApiUtils";

type RequestParams = {
  params: Promise<{ id: string }>;
};

export async function DELETE(req: Request, { params }: RequestParams) {
  try {
    const { id } = await params;
    const user = await ApiUtils.getSessionUser();
    userReservationService.cancelReservationFromClass(Number(id), user);
    return NextResponse.json(
      { message: RequestStatus.SUCCESS },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
}
