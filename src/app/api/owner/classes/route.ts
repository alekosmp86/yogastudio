import { NextResponse } from "next/server";
import { http } from "@/lib/http";
import { ApiType } from "@/enums/ApiTypes";
import { CreateClassResponse } from "@/types/classes/CreateClassResponse";
import { GymClass } from "@/types/classes/GymClass";
import { RequestStatus } from "@/enums/RequestStatus";

export async function GET() {
  try {
    const response = await http.get<GymClass[]>("/owner/classes", ApiType.BACKEND);
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
    const response = await http.post<CreateClassResponse>(`/owner/classes`, ApiType.BACKEND, body);
    
    if (!response) {
      throw new Error(RequestStatus.CREATE_ERROR);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error creating class:", error);
    return NextResponse.json(
      { message: RequestStatus.CREATE_ERROR },
      { status: 500 }
    );
  }
}

