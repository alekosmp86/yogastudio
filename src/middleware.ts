import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/register",
  "/auth/verify",
  "/api/auth/token",
  "/api/auth/magic-link"
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow all public pages
  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Read cookie
  const token = req.cookies.get("session")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Verify JWT
  try {
    const secret = process.env.JWT_SECRET!;
    jwt.verify(token, secret);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
