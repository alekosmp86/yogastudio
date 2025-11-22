import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_URL_BACKEND;

export async function GET(req: Request) {
  const res = await fetch(`${BACKEND_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });

  if (!res.ok) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const data = await res.json();
  return NextResponse.json(data, { status: 200 });
}
