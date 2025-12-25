import { RequestStatus } from "@/enums/RequestStatus";
import { publicPreferenceService } from "app/api";

export async function GET() {
    try {
      const publicPreferences = await publicPreferenceService.getPreferences();
      return Response.json({message: RequestStatus.SUCCESS, data: publicPreferences}, { status: 200 });
    } catch (error) {
      console.error("Error fetching public preferences:", error);
      return Response.json({ message: RequestStatus.ERROR }, { status: 500 });
    }
}