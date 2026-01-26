import { User, UserPenalty } from "@prisma/client";
import { userPenaltyService } from "../api";
import { BusinessTime } from "@/lib/utils/date";
import { prisma } from "@/lib/prisma";

export const afterUserCreatedHook = async (user: User) => {
  const penalties = await userPenaltyService.findByUserId(user.id);

  const sessionUser: User & { penalties: UserPenalty | null } = {
    ...user,
    penalties,
  };

  checkIfUserShouldBeUnblocked(penalties);

  return sessionUser;
};

const checkIfUserShouldBeUnblocked = async (penalties: UserPenalty | null) => {
  if (!penalties) {
    return;
  }

  const timezonePreference = await prisma.appPreferences.findUnique({
    where: { name: "timezone" },
  });
  const timezone = timezonePreference?.value || "UTC";
  const businessTime = new BusinessTime(timezone);

  if (
    penalties &&
    penalties.blockedUntil &&
    businessTime.now().date > penalties.blockedUntil
  ) {
    await userPenaltyService.unblockUser(penalties.userId);
  }
};
