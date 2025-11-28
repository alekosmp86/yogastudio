import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";
import { User } from "@/types/User";

export async function GET() {
  const {message, data} = await http.get<ApiResponse<User[]>>("/owner/users", ApiType.BACKEND);
  console.log(message, data);

  if (message !== RequestStatus.SUCCESS) {
    return NextResponse.json({ message }, { status: 500 });
  }

  return NextResponse.json({ message, data });
}