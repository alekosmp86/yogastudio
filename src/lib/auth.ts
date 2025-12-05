import { SessionUser } from "@/types/SessionUser";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function readSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie) return null;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(sessionCookie.value, secret);

    if (!payload?.user) return null;

    return payload.user as SessionUser;
  } catch (err) {
    return null;
  }
}