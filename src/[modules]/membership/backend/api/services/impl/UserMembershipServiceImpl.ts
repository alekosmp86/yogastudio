import { prisma } from "@/lib/prisma";
import { UserMembershipService } from "../UserMembershipService";
import { MembershipStatus } from "@/modules/membership/enums/MembershipStatus";
import { UserMembership } from "../../models/UserMembership";

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
      membershipPlan: userMembership.membershipPlan,
    };
  }
}
