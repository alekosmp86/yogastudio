import { NextResponse } from "next/server";
import { userMapper, userService } from "app/api";
import { RequestStatus } from "@/enums/RequestStatus";
import { ConsoleLogger } from "app/api/logger/_services/impl/ConsoleLogger";

const logger = new ConsoleLogger('User Controller');

export async function GET() {
  try {
    const users = await userService.getAllUsers();
    return NextResponse.json({ message: RequestStatus.SUCCESS, data: users.map(user => userMapper.toUser(user))});
  } catch (error) {
    logger.error(error as string);
    return NextResponse.json({ message: RequestStatus.ERROR, data: [] });
  }
}