import { NextResponse } from "next/server";
import { preferenceMapper, preferenceService } from "../..";
import { RequestStatus } from "@/enums/RequestStatus";
import { ConsoleLogger } from "../../logger/impl/ConsoleLogger";
import { AppPreference } from "@/types/preferences/AppPreference";

const logger = new ConsoleLogger("PreferencesController");

export async function GET() {
  try {
    const preferences = await preferenceService.getPreferences();
    return NextResponse.json({
      message: RequestStatus.SUCCESS,
      data: preferenceMapper.toAppPreferenceArray(preferences).sort((a, b) => a.id - b.id),
    });
  } catch (error) {
    console.error("Error fetching preferences:", error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const preferences = body.map((preference: AppPreference) =>
    preferenceMapper.toPrismaPreference(preference)
  );

  try {
    await preferenceService.updatePreferences(preferences);
    return NextResponse.json({ message: RequestStatus.SUCCESS });
  } catch (error) {
    logger.error("Error saving preferences:", error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
}
