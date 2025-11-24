import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_URL_BACKEND;

export async function POST(request: Request) {
  console.log("Received POST request", request.body);
  const body = await request.json();

  try {
    const response = await fetch(`${BACKEND_URL}/owner/class`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to create class");
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    console.error("Error creating class:", error);
    return NextResponse.json(
      { error: "Failed to create class" },
      { status: 500 }
    );
  }
}
