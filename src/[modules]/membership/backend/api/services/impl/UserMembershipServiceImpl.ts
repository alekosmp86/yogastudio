import { prisma } from "@/lib/prisma";
import { UserMembershipService } from "../UserMembershipService";
import { MembershipStatus } from "@/modules/membership/enums/MembershipStatus";
import { UserMembership } from "../../models/UserMembership";
import { BusinessTime } from "@/lib/utils/date";

export class UserMembershipServiceImpl implements UserMembershipService {
  async getUserMembership(id: number): Promise<UserMembership | null> {
    const userMembership = await prisma.userMembership.findFirst({
      where: { userId: id, status: MembershipStatus.ACTIVE },
      include: {
        membershipPlan: true,
      },
    });
    if (!userMembership) return null;

    return {
      id: userMembership.id,
      userId: userMembership.userId,
      membershipPlanId: userMembership.membershipPlanId,
      status: userMembership.status,
      startDate: userMembership.startDate,
      endDate: userMembership.endDate,
      membershipPlan: userMembership.membershipPlan,
    };
  }

  async updateById(
    userMembershipId: number,
    newMembershipPlanId: number
  ): Promise<UserMembership | null> {
    // Fetch timezone and membership plan in parallel (1 DB round-trip instead of 2)
    const [timezone, membership] = await Promise.all([
      prisma.appPreferences.findFirst({
        where: { name: "timezone" },
        select: { value: true },
      }),
      prisma.membershipPlan.findUnique({
        where: { id: newMembershipPlanId },
        select: { durationDays: true },
      }),
    ]);

    if (!timezone || !membership) return null;

    const businessTime = new BusinessTime(timezone.value as string);
    const today = businessTime.now().date;

    // Use a transaction to update old membership and create new one atomically
    // This ensures data consistency and reduces DB calls from 2 to 1
    const updatedUserMembership = await prisma.$transaction(async (tx) => {
      // Get userId from the existing membership and expire it
      const oldMembership = await tx.userMembership.update({
        where: { id: userMembershipId },
        data: { status: MembershipStatus.EXPIRED },
        select: { userId: true },
      });

      // Create new active membership
      return tx.userMembership.create({
        data: {
          userId: oldMembership.userId,
          membershipPlanId: newMembershipPlanId,
          status: MembershipStatus.ACTIVE,
          startDate: today,
          endDate: businessTime.addDays(today, membership.durationDays),
        },
        include: {
          membershipPlan: true,
        },
      });
    });

    return {
      id: updatedUserMembership.id,
      userId: updatedUserMembership.userId,
      membershipPlanId: updatedUserMembership.membershipPlanId,
      status: updatedUserMembership.status,
      startDate: updatedUserMembership.startDate,
      endDate: updatedUserMembership.endDate,
      membershipPlan: updatedUserMembership.membershipPlan,
    };
  }

  async expireMembership(userMembershipId: number): Promise<void> {
    await prisma.userMembership.update({
      where: { id: userMembershipId },
      data: { status: MembershipStatus.EXPIRED },
    });
  }
}
