import { NextResponse } from "next/server";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ApiType } from "@/enums/ApiTypes";
import { User } from "@/types/User";

export async function POST(request: Request) {
    const body = await request.json();
    const response = await http.post<ApiResponse<User>>(`/auth/register`, ApiType.BACKEND, body);

    return NextResponse.json({message: response.message, data: response.data});
}