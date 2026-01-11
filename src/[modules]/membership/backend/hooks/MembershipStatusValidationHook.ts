import { User } from "@prisma/client";
import { BusinessTime } from "@/lib/utils/date";
import { prisma } from "@/lib/prisma";
import { MembershipStatus } from "../../enums/MembershipStatus";

export const membershipStatusValidationHook = async (payload: User) => {
  const { id } = payload;
  if (!payload.approved) {
    return payload;
  }

  const timezone = await prisma.appPreferences.findFirst({
    where: { name: "timezone" },
    select: { value: true },
  });

  const businessTime = new BusinessTime((timezone?.value as string) || "UTC");
  const today = businessTime.now().date;
  const userMembership = await prisma.userMembership.findFirst({
    where: { userId: id, status: MembershipStatus.ACTIVE },
    select: { endDate: true },
  });

  if (userMembership && userMembership.endDate < today) {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { approved: false },
    });
    return updatedUser;
  }

  return payload;
};
