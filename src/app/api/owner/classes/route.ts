import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_URL_BACKEND;

export async function GET() {
  const response = await fetch(`${BACKEND_URL}/owner/classes`);
  const data = await response.json();
  return NextResponse.json(data);
}
