import { http } from "@/lib/http";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ScheduledClass } from "@/types/schedule/ScheduledClass";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await req.json();

  try {
    const response = await http.put<ApiResponse<ScheduledClass>>(`/owner/schedule/${id}`, ApiType.BACKEND, body);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error updating schedule:", error);
    return NextResponse.json(
      { message: RequestStatus.ERROR },
      { status: 500 }
    );
  }
}