import { http } from "@/lib/http";
import { NextResponse } from "next/server";
import { ApiType } from "@/enums/ApiTypes";
import { ApiResponse } from "@/types/requests/ApiResponse";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const {message} = await http.get<ApiResponse<string>>(`/auth/magic-link?email=${email}`, ApiType.BACKEND);
  return NextResponse.json({message});
}