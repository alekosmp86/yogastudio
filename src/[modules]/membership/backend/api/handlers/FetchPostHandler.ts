import { NextRequest, NextResponse } from "next/server";
import { RequestStatus } from "@/enums/RequestStatus";
import { MembershipServiceImpl } from "../services/impl/MembershipServiceImpl";

export const GET = async () => {
  try {
    const membershipService = new MembershipServiceImpl();
    const membershipPlans = await membershipService.getMembershipPlans();
    return NextResponse.json(
      { message: RequestStatus.SUCCESS, data: membershipPlans },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const membershipService = new MembershipServiceImpl();
    const createdMembership = await membershipService.createMembership(body);
    return NextResponse.json(
      { message: RequestStatus.SUCCESS, data: createdMembership },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
};
