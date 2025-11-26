import { http } from "@/lib/http";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ScheduledClass } from "@/types/schedule/ScheduledClass";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const {message, data} = await http.post<ApiResponse<ScheduledClass>>(
      `/owner/schedule`,
      ApiType.BACKEND,
      body
    );

    console.log(message, data);
    
    if (message !== RequestStatus.SUCCESS) {
      return NextResponse.json({ message }, { status: 500 });
    }

    return NextResponse.json({ message, data });
  } catch (error) {
    console.error("Error creating class:", error);
    return NextResponse.json(
      { message: RequestStatus.ERROR },
      { status: 500 }
    );
  }
}