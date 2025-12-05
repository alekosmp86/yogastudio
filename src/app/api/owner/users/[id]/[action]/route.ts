import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";
import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";
import { userService } from "app/api";
import { UserDto } from "app/api/users/(dto)/UserDto";

const logger = new ConsoleLogger('User Controller');

type RequestParams = {
  params: Promise<{ id: string, action: string }>;
};

export async function PUT(
  req: Request,
  { params }: RequestParams
) {
  const { id, action } = await params;

  try {
    const updatedUser = await userService.executeAction(Number(id), action);
    if (!updatedUser) {
      return NextResponse.json({ message: RequestStatus.ERROR }, { status: 404 });
    }
    return NextResponse.json({ message: RequestStatus.SUCCESS, data: UserDto.fromUser(updatedUser) });
  } catch (error) {
    logger.error(error as string);
    return NextResponse.json(
      { message: RequestStatus.ERROR },
      { status: 500 }
    );
  }
}