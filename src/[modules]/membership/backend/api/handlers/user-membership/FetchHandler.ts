import { userMembershipService } from "../..";
import { NextRequest, NextResponse } from "next/server";
import { RequestStatus } from "@/enums/RequestStatus";

export const GET = async (
  _req: NextRequest,
  params?: Record<string, string>
) => {
  try {
    const id = params?.id;
    if (!id) throw new Error("ID not provided");
    const userMembership = await userMembershipService.getUserMembership(Number(id));
    return NextResponse.json(
      { message: RequestStatus.SUCCESS, data: userMembership },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
};
