import { accountService, googleUserMapper, userService } from "app/api";
import { NextRequest, NextResponse } from "next/server";
import { GoogleUserInfo } from "app/api/auth/providers/google/(dto)/GoogleUserInfo";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
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
  let user = await userService.findUniqueByFields({ email: profile.email });
  if (!user) {
    const userToCreate = googleUserMapper.toUser(profile);
    user = await userService.create(userToCreate);
  }

  const accountToCreate = {
    userId: user.id,
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

  return NextResponse.json({ user });
}
