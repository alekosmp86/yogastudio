import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Roles } from "./enums/Roles";
import { jwtVerify } from "jose";
import { SessionUser } from "./types/SessionUser";

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/register",
  "/auth/verify",
  "/api/auth/register",
  "/api/auth/token",
  "/api/auth/magic-link",
];

async function verifyJWT(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as {user: SessionUser}; // contains your user object
  } catch (error) {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow all public pages
  if (
    PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))
  ) {
    return NextResponse.next();
  }

  // Everything else requires auth
  const token = req.cookies.get("session")?.value;

  if (!token) {
    console.log("No token");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("Token: ", token);

  // Verify JWT
  try {
    const payload = await verifyJWT(token);
    if (!payload) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    console.log("Decoded: ", payload);

    // Optional: protect owner-only pages
    if (pathname.startsWith("/owner") && payload.user.role !== Roles.OWNER) {
      console.log("Owner-only page accessed by non-owner");
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Optional: protect customer-only pages
    if (pathname.startsWith("/customer") && payload.user.role !== Roles.CLIENT) {
      console.log("Customer-only page accessed by non-customer");
      return NextResponse.redirect(new URL("/", req.url));
    }

    console.log("Authenticated");
    return NextResponse.next();
  } catch (error) {
    console.log("Invalid token", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
