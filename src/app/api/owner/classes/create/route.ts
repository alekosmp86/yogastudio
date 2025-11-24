import { ApiType } from "@/enums/ApiTypes";
import { http } from "@/lib/http";
import { GymClass } from "@/types/GymClass";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const response: GymClass = await http.post(`/owner/class`, ApiType.BACKEND, body);
    
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
