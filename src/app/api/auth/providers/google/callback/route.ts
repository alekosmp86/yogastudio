import {
  accountService,
  googleUserMapper,
  preferenceService,
  tokenService,
  userPenaltyService,
  userService,
} from "app/api";
import { NextRequest, NextResponse } from "next/server";
import { GoogleUserInfo } from "app/api/auth/providers/google/_dto/GoogleUserInfo";
import { ConsoleLogger } from "app/api/logger/_services/impl/ConsoleLogger";
import { User, UserPenalty } from "@prisma/client";
import DayjsUtils from "@/lib/utils/dayjs";
import dayjs from "dayjs";

const logger = new ConsoleLogger("GoogleCallback");

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const code = url.searchParams.get("code");
  if (!code)
    return NextResponse.json({ error: "Missing code" }, { status: 400 });

  // 1. Exchange code for token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri:
        process.env.NEXT_PUBLIC_APP_URL + "/api/auth/providers/google/callback",
      grant_type: "authorization_code",
    }),
  }).then((r) => r.json());

  if (!tokenRes.access_token)
    return NextResponse.json(
      { error: "Missing access token" },
      { status: 400 }
    );

  const accessToken = tokenRes.access_token;
  // 2. Get profile
  const profile: GoogleUserInfo = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  ).then((r) => r.json());

  if (!profile.email)
    return NextResponse.json({ error: "Missing email" }, { status: 400 });

  // 3. Find or create User + Account
  const existingUser = await userService.findUniqueByFields({
    email: profile.email,
  });

  const penalties = existingUser
    ? await userPenaltyService.findByUserId(existingUser.id)
    : null;

  const sessionUser: User & { penalties: UserPenalty | null } = existingUser
    ? {
        ...existingUser,
        penalties,
      }
    : {
        ...(await userService.create(googleUserMapper.toUser(profile))),
        penalties,
      };

  // Attach penalties (only makes sense for existing users)
  if (penalties) {
    await userPenaltyService.calculatePenalty(penalties);
  }

  //check if user should be unblocked
  const timezone = await preferenceService.getStringPreferenceValue(
    "timezone"
  );
  if (
    penalties &&
    penalties.blockedUntil &&
    DayjsUtils.startOfDay(dayjs(), timezone) > dayjs(penalties.blockedUntil)
  ) {
    await userPenaltyService.unblockUser(penalties.userId);
  }

  try {
    const accountToCreate = {
      userId: sessionUser.id,
      provider: "google",
      providerAccountId: profile.id,
      type: "oauth",
      access_token: tokenRes.access_token,
      refresh_token: tokenRes.refresh_token,
      expires_at: tokenRes.expires_in,
      token_type: tokenRes.token_type,
      scope: tokenRes.scope,
    };

    await accountService.upsert(accountToCreate);

    // 4. Create response to set the session cookie
    const response = NextResponse.redirect(url.origin + "/");
    await tokenService.createSession(response, sessionUser);

    return response;
  } catch (error) {
    logger.error("Error creating account:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
