import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

type SessionUser = {
  id: number;
  email: string;
  role: string;
  name: string;
};

export async function readSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    console.log(`Session cookie: ${sessionCookie}`);

    if (!sessionCookie) return null;

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET missing");

    // Decode JWT
    const payload = decodeJwt(sessionCookie.value);

    if (!payload?.user?.id) return null;

    // Build session object
    return payload.user;
  } catch (err) {
    // invalid cookie, expired token, tampered, etc
    return null;
  }
}

export function decodeJwt(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      user: {
        id: number;
        email: string;
        role: string;
        name: string;
      };
    };

    return decoded;
  } catch {
    return null;
  }
}
