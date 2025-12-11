import { NextResponse } from "next/server";
import { RequestStatus } from "@/enums/RequestStatus";
import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";
import { tokenService } from "app/api";

const logger = new ConsoleLogger("TokenRoute");

export async function POST(request: Request) {
  const { token } = await request.json();

  logger.log("Validating token...");
  try {
    const user = await tokenService.getUserWithToken(token);

    const res = NextResponse.json({ message: RequestStatus.SUCCESS });
    await tokenService.createSession(res, user); // <--- cookie set here

    return res;
  } catch (error) {
    logger.error("Could not validate token:", error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  } finally {
    logger.log("Token validation ended");
  }
}
