import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";
import { ApiType } from "@/enums/ApiTypes";

type RequestParams = {
  params: Promise<{ id: string, action: string }>;
};

export async function PUT(
  req: Request,
  { params }: RequestParams
) {
  const { id, action } = await params;

  try {
    const response = await http.put<ApiResponse<RequestStatus>>(`/owner/users/${id}/${action}`, ApiType.BACKEND);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: RequestStatus.ERROR },
      { status: 500 }
    );
  }
}