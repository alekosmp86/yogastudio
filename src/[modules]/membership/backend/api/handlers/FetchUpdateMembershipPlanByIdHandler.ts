import { NextRequest, NextResponse } from "next/server";
import { RequestStatus } from "@/enums/RequestStatus";
import { MembershipServiceImpl } from "../services/impl/MembershipServiceImpl";
import { Membership } from "../models/Membership";

export const GET = async (
  _req: NextRequest,
  params?: Record<string, string>
) => {
  try {
    const id = params?.id;
    if (!id) throw new Error("ID not provided");
    const membershipService = new MembershipServiceImpl();
    const membershipPlan = await membershipService.getMembershipPlanById(
      Number(id)
    );

    if (!membershipPlan) {
      return NextResponse.json(
        { message: RequestStatus.ERROR, error: "Plan not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: RequestStatus.SUCCESS, data: membershipPlan },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest, params?: Record<string, string>) => {
  try {
    const id = params?.id;
    if (!id) throw new Error("ID is required");
    const body = (await req.json()) as Partial<Membership>;
    const membershipService = new MembershipServiceImpl();
    const updatedPlan = await membershipService.updateMembershipPlan(
      Number(id),
      body
    );
    return NextResponse.json(
      { message: RequestStatus.SUCCESS, data: updatedPlan },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
};
