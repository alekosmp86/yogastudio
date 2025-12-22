'use server';

import { SessionUser } from "@/types/SessionUser";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

export async function readSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie) return null;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(sessionCookie.value, secret);

    if (!payload?.user) return null;

    return payload.user as SessionUser;
  } catch {
    return null;
  }
}

export async function refreshSession(user: SessionUser) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

  const token = await new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("45m")
    .sign(secret);

  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}
