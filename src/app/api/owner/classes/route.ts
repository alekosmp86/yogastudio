import { NextResponse } from "next/server";
import { http } from "@/lib/http";
import { ApiType } from "@/enums/ApiTypes";

export async function GET() {
  const response = await http.get("/owner/classes", ApiType.BACKEND);
  return NextResponse.json(response);
}
