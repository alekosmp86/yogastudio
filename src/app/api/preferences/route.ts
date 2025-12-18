import { NextResponse } from "next/server";
import { preferenceService } from "..";
import { RequestStatus } from "@/enums/RequestStatus";

export async function GET() {
    try {
        const preferences = await preferenceService.getPreferences();
        return NextResponse.json({message: RequestStatus.SUCCESS, data: preferences});
    } catch (error) {
        console.error("Error fetching preferences:", error);
        return NextResponse.json(
            { message: RequestStatus.ERROR },
            { status: 500 }
        );
    }
}