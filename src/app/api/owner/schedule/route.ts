import { http } from "@/lib/http";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const message = await http.post<RequestStatus>(
      `/owner/schedule`,
      ApiType.BACKEND,
      body
    );

    if (message !== RequestStatus.CREATE_SUCCESS) {
      return NextResponse.json({ message }, { status: 500 });
    }

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Error creating class:", error);
    return NextResponse.json(
      { message: RequestStatus.CREATE_ERROR },
      { status: 500 }
    );
  }
}