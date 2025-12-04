import { NextResponse } from "next/server";
import { magicLinkService } from "..";
import { RequestStatus } from "@/enums/RequestStatus";
import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";
import { userService } from "app/api";
import jwt from "jsonwebtoken";
import { UserDto } from "app/api/users/(dto)/UserDto";

const logger = new ConsoleLogger("TokenRoute");

export async function POST(request: Request) {
  const { token } = await request.json();

  logger.log("Validating token...");
  try {
    const user = await getUserWithToken(token);

    const res = NextResponse.json({ message: RequestStatus.SUCCESS });
    createSession(res, UserDto.fromUser(user)); // <--- cookie set here

    logger.log("Response headers:", res.headers);
    return res;
  } catch (error) {
    logger.error("Could not validate token:", error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  } finally {
    logger.log("Token validation ended");
  }
}

async function getUserWithToken(token: string) {
  const linkWithToken = await magicLinkService.findLinkByToken(token);
  logger.log("Link with token:", linkWithToken);

  if (!linkWithToken) {
    logger.log("Link with token not found");
    throw new Error("Link with token not found");
  }

  const user = await userService.getUserById(linkWithToken.userId);
  if (!user) {
    logger.log("User with token not found");
    throw new Error("User with token not found");
  }
  logger.log("User with token found:", user.email);
  return user;
}

function createSession(res: NextResponse, userDto: UserDto) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET missing");

  const sessionToken = jwt.sign({ user: userDto }, secret, { expiresIn: "60m" });

  res.cookies.set("session", sessionToken, {
    httpOnly: true,
    secure: false, // only for development
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });
}
