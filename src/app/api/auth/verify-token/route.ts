import { Roles } from "@/enums/Roles";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_URL_BACKEND;

export async function POST(req: Request) {
  const { token } = await req.json();

  const res = await fetch(`${BACKEND_URL}/auth/token-validation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: 401 });
  }

  const { accessToken, expiresIn, user } = data;

  const response = NextResponse.redirect(
    user.role === Roles.CLIENT
      ? "/customer/home"
      : "/owner"
  );

  response.cookies.set({
    name: "accessToken",
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: expiresIn,
  });

  return response;
}
