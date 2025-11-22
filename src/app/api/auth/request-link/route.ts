import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_URL_BACKEND;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const res = await fetch(`${BACKEND_URL}/auth/magic-link?email=${email}`);
  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}

