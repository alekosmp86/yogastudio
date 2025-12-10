import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export interface TokenService {
    getUserWithToken(token: string): Promise<User>;
    createSession(res: NextResponse, user: User): Promise<void>;
}