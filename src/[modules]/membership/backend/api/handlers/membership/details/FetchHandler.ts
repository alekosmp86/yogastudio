import { readSession } from "@/lib/auth";
import { membershipService } from "../../..";
import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const user = await readSession();
    if (!user) {
      return NextResponse.json(
        { message: RequestStatus.UNAUTHORIZED },
        { status: 401 },
      );
    }
    const membershipDetails = await membershipService.getMembershipDetails(
      user.id,
    );
    if (!membershipDetails) {
      return NextResponse.json(
        { message: RequestStatus.NOT_FOUND },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: RequestStatus.SUCCESS, data: membershipDetails },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
};
