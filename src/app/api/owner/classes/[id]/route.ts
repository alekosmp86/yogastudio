import { http } from "@/lib/http";
import { ApiType } from "@/enums/ApiTypes";
import { NextResponse } from "next/server";
import { RequestStatus } from "@/enums/RequestStatus";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const response = await http.delete<RequestStatus>(`/owner/classes/${id}`, ApiType.BACKEND);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error deleting class:", error);
    return NextResponse.json(
      { message: RequestStatus.DELETE_ERROR },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await req.json();

  try {
    const response = await http.put<RequestStatus>(`/owner/classes/${id}`, ApiType.BACKEND, body);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error updating class:", error);
    return NextResponse.json(
      { message: RequestStatus.UPDATE_ERROR },
      { status: 500 }
    );
  }
}