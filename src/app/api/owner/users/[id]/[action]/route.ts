import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";
import { ConsoleLogger } from "app/api/logger/_services/impl/ConsoleLogger";
import { userMapper, userService } from "app/api";
import { User } from "@prisma/client";
import { UserDetail } from "@/types/users/UserDetail";

const logger = new ConsoleLogger("User Controller");

type RequestParams = {
  params: Promise<{ id: string; action: string }>;
};

export async function PUT(req: Request, { params }: RequestParams) {
  const { id, action } = await params;

  try {
    const updatedUser = await userService.executeAction<User>(Number(id), action);
    if (!updatedUser) {
      return NextResponse.json(
        { message: RequestStatus.ERROR },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: RequestStatus.SUCCESS,
      data: userMapper.toUser(updatedUser),
    });
  } catch (error) {
    logger.error(error as string);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: RequestParams) {
  const { id, action } = await params;

  try {
    const userDetails = await userService.executeAction<UserDetail>(Number(id), action);
    if (!userDetails) {
      return NextResponse.json(
        { message: RequestStatus.ERROR },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: RequestStatus.SUCCESS,
      data: userDetails,
    });
  } catch (error) {
    logger.error(error as string);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
}
