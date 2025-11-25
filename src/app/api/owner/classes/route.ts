import { NextResponse } from "next/server";
import { http } from "@/lib/http";
import { ApiType } from "@/enums/ApiTypes";
import { GymClass } from "@/types/classes/GymClass";
import { RequestStatus } from "@/enums/RequestStatus";
import { ApiResponse } from "@/types/requests/ApiResponse";

export async function GET() {
  try {
    const response = await http.get<ApiResponse<GymClass[]>>(
      "/owner/classes",
      ApiType.BACKEND
    );
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching classes:", error);
    return NextResponse.json(
      { message: RequestStatus.GET_ERROR },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const {message, data} = await http.post<ApiResponse<number>>(
      `/owner/classes`,
      ApiType.BACKEND,
      body
    );

    if (message !== RequestStatus.CREATE_SUCCESS) {
      return NextResponse.json({ message }, { status: 500 });
    }

    return NextResponse.json({ message, data });
  } catch (error) {
    console.error("Error creating class:", error);
    return NextResponse.json(
      { message: RequestStatus.CREATE_ERROR },
      { status: 500 }
    );
  }
}
