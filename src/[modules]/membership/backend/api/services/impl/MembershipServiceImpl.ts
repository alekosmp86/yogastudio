import { prisma } from "@/lib/prisma";
import { Membership } from "../../models/Membership";
import { MembershipService } from "../MembershipService";
import { MembershipTypes } from "@/modules/membership/enums/MembershipTypes";
import { MembershipDetails } from "../../models/MembershipDetails";
import { MembershipStatus } from "@/modules/membership/enums/MembershipStatus";

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
  async getMembershipPlanById(id: number): Promise<Membership | null> {
    const plan = await prisma.membershipPlan.findUnique({
      where: { id },
    });

    if (!plan) return null;

    return {
      id: plan.id,
      name: plan.name,
      durationDays: plan.durationDays,
      maxActivities: plan.maxActivities,
      isActive: plan.isActive,
    };
  }

  async updateMembershipPlan(
    id: number,
    data: Partial<Membership>,
  ): Promise<Membership> {
    const updatedPlan = await prisma.membershipPlan.update({
      where: { id },
      data: {
        name: data.name,
        durationDays: data.durationDays,
        maxActivities: data.maxActivities,
        isActive: data.isActive,
      },
    });

    return {
      id: updatedPlan.id,
      name: updatedPlan.name,
      durationDays: updatedPlan.durationDays,
      maxActivities: updatedPlan.maxActivities,
      isActive: updatedPlan.isActive,
    };
  }

  async deleteMembershipPlan(id: number): Promise<Membership> {
    const deletedPlan = await prisma.membershipPlan.delete({
      where: { id },
    });
    return {
      id: deletedPlan.id,
      name: deletedPlan.name,
      durationDays: deletedPlan.durationDays,
      maxActivities: deletedPlan.maxActivities,
      isActive: deletedPlan.isActive,
    };
  }

  async getMembershipDetails(
    userId: number,
  ): Promise<MembershipDetails | null> {
    const membership = await prisma.userMembership.findFirst({
      where: {
        userId,
        status: MembershipStatus.ACTIVE,
      },
      include: {
        membershipPlan: true,
        templates: {
          include: {
            template: true,
          },
        },
      },
    });

    if (!membership) {
      return null;
    }

    return {
      id: membership.id,
      userId: membership.userId,
      membershipPlanId: membership.membershipPlanId,
      startDate: membership.startDate,
      endDate: membership.endDate,
      status: membership.status,
      membershipPlan: membership.membershipPlan,
      activities: membership.templates.map((t) => t.template),
    };
  }
}
