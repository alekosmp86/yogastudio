import { TokenService } from "../TokenService";
import { User, UserPenalty } from "@prisma/client";
import { magicLinkService } from "app/api/auth";
import { ConsoleLogger } from "app/api/logger/_services/impl/ConsoleLogger";
import { UserService } from "app/api/users/_services/UserService";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const logger = new ConsoleLogger("TokenServiceImpl");

export class TokenServiceImpl implements TokenService {
  constructor(private readonly userService: UserService) {}

  async getUserWithToken(token: string): Promise<User> {
    const linkWithToken = await magicLinkService.findLinkByToken(token);
    logger.log("Link with token:", linkWithToken);

    if (!linkWithToken) {
      logger.log("Link with token not found");
      throw new Error("Link with token not found");
    }

    const user = await this.userService.getUserById(linkWithToken.userId);
    if (!user) {
      logger.log("User with token not found");
      throw new Error("User with token not found");
    }
    logger.log("User with token found:", user.email);
    return user;
  }

  async createSession(res: NextResponse, user: User & { penalties?: UserPenalty | null }): Promise<void> {
    logger.log("Creating session for user:", user.email);

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const token = await new SignJWT({ user })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("45m")
      .sign(secret);

    logger.log("Token created:", token);

    res.cookies.set("session", token, {
      httpOnly: true,
      secure: true, // only for development
      sameSite: "lax",
      path: "/",
      maxAge: 45 * 60,
    });
  }
}
