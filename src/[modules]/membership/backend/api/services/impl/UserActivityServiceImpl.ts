import { prisma } from "@/lib/prisma";
import { UserActivity } from "../../models/UserActivity";
import { UserActivityService } from "../UserActivityService";
import { MembershipStatus } from "@/modules/membership/enums/MembershipStatus";
import { userMembershipService } from "../..";

export class UserActivityServiceImpl implements UserActivityService {
  async getAllUserActivities(userId: number): Promise<UserActivity | null> {
    const [userActivities, classTemplates] = await Promise.all([
      prisma.userMembership.findFirst({
        where: {
          userId,
          status: MembershipStatus.ACTIVE
        },
        include: {
          templates: true,
          membershipPlan: true,
        },
      }),
      prisma.classTemplate.findMany(),
    ]);

    if (!userActivities) {
      return {
        userActivities: null,
        activities: classTemplates,
      };
    }

    return {
      userActivities,
      activities: classTemplates,
    };
  }

  async saveUserActivities(
    userId: number,
    activitiesIds: number[]
  ): Promise<void> {
    const userMembership = await userMembershipService.getUserMembership(
      userId
    );
    if (!userMembership || !userMembership.membershipPlan) {
      throw new Error("User membership or plan not found");
    }

    if (activitiesIds.length > userMembership.membershipPlan.maxActivities) {
      throw new Error(
        `Exceeded maximum allowed activities (${userMembership.membershipPlan.maxActivities})`
      );
    }

    await prisma.$transaction(async (tx) => {
      // 1. Clear existing selections for this membership
      await tx.userSelectedTemplate.deleteMany({
        where: {
          userMembershipId: userMembership.id,
        },
      });

      // 2. Bulk insert new selections if any
      if (activitiesIds.length > 0) {
        await tx.userSelectedTemplate.createMany({
          data: activitiesIds.map((templateId) => ({
            userMembershipId: userMembership.id,
            templateId: templateId,
          })),
        });
      }
    });
  }
}
