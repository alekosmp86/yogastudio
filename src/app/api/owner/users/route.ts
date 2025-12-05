import { NextResponse } from "next/server";
import { userService } from "app/api";
import { UserDto } from "app/api/users/(dto)/UserDto";
import { RequestStatus } from "@/enums/RequestStatus";
import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";

const logger = new ConsoleLogger('User Controller');

export async function GET() {
  try {
    const users = await userService.getAllUsers();
    return NextResponse.json({ message: RequestStatus.SUCCESS, data: users.map(user => UserDto.fromUser(user))});
  } catch (error) {
    logger.error(error as string);
    return NextResponse.json({ message: RequestStatus.ERROR, data: [] });
  }
}