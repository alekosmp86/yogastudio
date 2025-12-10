import { NextResponse } from "next/server";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

export async function GET() {
  const redirectUrl = new URL(GOOGLE_AUTH_URL);
  redirectUrl.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID!);
  redirectUrl.searchParams.set("redirect_uri", process.env.NEXT_PUBLIC_APP_URL + "/api/auth/providers/google/callback");
  redirectUrl.searchParams.set("response_type", "code");
  redirectUrl.searchParams.set("scope", "openid email profile");

  return NextResponse.redirect(redirectUrl.toString());
}
