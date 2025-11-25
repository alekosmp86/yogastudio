import { NextResponse } from "next/server";
import { http } from "@/lib/http";
import { ApiType } from "@/enums/ApiTypes";
import { CreateClassResponse } from "@/types/classes/CreateClassResponse";
import { GymClass } from "@/types/classes/GymClass";

export async function GET() {
  const response = await http.get<GymClass[]>("/owner/classes", ApiType.BACKEND);
  return NextResponse.json(response);
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const response = await http.post<CreateClassResponse>(`/owner/classes`, ApiType.BACKEND, body);
    
    if (!response) {
      throw new Error("Failed to create class");
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error creating class:", error);
    return NextResponse.json(
      { error: "Failed to create class" },
      { status: 500 }
    );
  }
}

