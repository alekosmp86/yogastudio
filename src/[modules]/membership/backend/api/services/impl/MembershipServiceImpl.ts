import { prisma } from "@/lib/prisma";
import { Membership } from "../../models/Membership";
import { MembershipService } from "../MembershipService";
import { MembershipTypes } from "@/modules/membership/enums/MembershipTypes";

export class MembershipServiceImpl implements MembershipService {
  async createMembership(payload: Membership): Promise<Membership> {
    const createdMembership = await prisma.membershipPlan.create({
      data: payload,
    });
    return {
      id: createdMembership.id,
      name: createdMembership.name,
      durationDays: createdMembership.durationDays,
      maxActivities: createdMembership.maxActivities,
      isActive: createdMembership.isActive,
    };
  }

  async getMembershipPlans(): Promise<Membership[]> {
    const membershipPlans = await prisma.membershipPlan.findMany({
      where: {
        name: {
          not: MembershipTypes.SYSTEM_ACCESS,
        },
      },
    });
    return membershipPlans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      durationDays: plan.durationDays,
      maxActivities: plan.maxActivities,
      isActive: plan.isActive,
    }));
  }
}
