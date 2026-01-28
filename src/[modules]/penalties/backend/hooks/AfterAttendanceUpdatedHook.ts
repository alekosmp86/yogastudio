import { prisma } from "@/lib/prisma";
import { userPenaltyService } from "../api";
import { PenaltyHooksUtils } from "./PenaltyHooksUtils";
import { BusinessTime } from "@/lib/utils/date";

export const afterAttendanceUpdatedHook = async (payload: {
  userId: number;
  attended: boolean;
}) => {
  const { userId, attended } = payload;

  if (!attended) {
    const penalty = await userPenaltyService.addPenalty(userId);

    const timezonePref = await prisma.appPreferences.findUnique({
      where: { name: "timezone" },
    });
    const timezone = timezonePref?.value || "UTC";
    const businessTime = new BusinessTime(timezone);

    if (
      penalty.blockedUntil &&
      penalty.blockedUntil > businessTime.now().date
    ) {
      await PenaltyHooksUtils.notifyUserBlocked(userId, businessTime);
    }
  }

  return payload;
};
