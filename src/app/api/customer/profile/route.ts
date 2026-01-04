import { profileService } from "app/api";
import { ApiUtils } from "app/api/utils/ApiUtils";
import { NextResponse } from "next/server";
import { RequestStatus } from "@/enums/RequestStatus";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const user = await ApiUtils.getSessionUser();

    await profileService.updateProfile(user.id, body);
    return NextResponse.json(
      { message: RequestStatus.SUCCESS },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
}

export async function GET() {
  try {
    const user = await ApiUtils.getSessionUser();
    const profile = await profileService.getProfile(user.id);
    console.log("Profile data:", profile);
    return NextResponse.json(
      { message: RequestStatus.SUCCESS, data: profile },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
}
