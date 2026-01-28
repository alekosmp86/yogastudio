import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { MembershipTypes } from "../../enums/MembershipTypes";
import { BusinessTime } from "@/lib/utils/date";
import { MembershipStatus } from "../../enums/MembershipStatus";

export const userCreatedGoogleOauthPostHook = async (user: User) => {
  if (!user) return user;

  // check if user has an active membership
  const userMembership = await prisma.userMembership.findFirst({
    where: {
      AND: [
        { userId: user.id },
        { status: MembershipStatus.ACTIVE },
      ],
    },
  });

  if (userMembership) return user;

  // get the system access membership
  const systemAccessMembership = await prisma.membershipPlan.findUnique({
    where: {
      name: MembershipTypes.SYSTEM_ACCESS,
    },
  });

  if (!systemAccessMembership) return user;

  // set the necessary data for the membership
  const timezone = await prisma.appPreferences.findUnique({
    where: { name: "timezone" },
  });
  const businessTime = new BusinessTime(timezone?.value || "UTC");
  const startDate = businessTime.now().date;
  const endDate = businessTime.addDays(startDate, systemAccessMembership.durationDays);

  // create the default membership for the user
  await prisma.userMembership.create({
    data: {
      userId: user.id,
      membershipPlanId: systemAccessMembership.id,
      startDate,
      endDate,
      status: MembershipStatus.ACTIVE,
    }
  });

  return user;
}