import { NextRequest, NextResponse } from "next/server";
import { userActivityService } from "../..";
import { RequestStatus } from "@/enums/RequestStatus";

export const GET = async (
  _req: NextRequest,
  params?: Record<string, string>
) => {
  try {
    const userId = params?.id;
    if (!userId) throw new Error("ID not provided");

    const userActivities = await userActivityService.getAllUserActivities(
      Number(userId)
    );
    return NextResponse.json({
      message: RequestStatus.SUCCESS,
      data: userActivities,
    });
  } catch (error) {
    return NextResponse.json({ message: RequestStatus.ERROR, data: null });
  }
};

export const POST = async (
  _req: NextRequest,
  params?: Record<string, string>
) => {
  try {
    const userId = params?.id;
    if (!userId) throw new Error("ID not provided");

    const { activitiesIds } = await _req.json();

    const userActivities = await userActivityService.saveUserActivities(
      Number(userId),
      activitiesIds
    );
    return NextResponse.json({
      message: RequestStatus.SUCCESS,
      data: userActivities,
    });
  } catch (error) {
    return NextResponse.json({ message: RequestStatus.ERROR, data: null });
  }
};
