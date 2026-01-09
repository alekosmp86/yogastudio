import { AppTask } from "@/tasks/TaskType";
import { PrismaClient } from "@prisma/client";
import { MembershipTypes } from "../enums/MembershipTypes";
import { BusinessTime } from "@/lib/utils/date";
import { MembershipStatus } from "../enums/MembershipStatus";
import { MembershipModule } from "../membership.module";

export const AssignSystemAccessTask: AppTask = {
  name: "membership:assign-system-access-to-users-without-membership",

  async run({ db }: { db: PrismaClient }) {
    // 1. Ensure FULL_ACCESS plan exists
    const fullAccessPlan = await db.membershipPlan.upsert({
      where: { name: MembershipTypes.SYSTEM_ACCESS },
      update: {},
      create: {
        name: MembershipTypes.SYSTEM_ACCESS,
        maxActivities: -1, // unlimited
        durationDays: 30,
        isActive: true,
      },
    });

    // 2. Find users without an ACTIVE membership
    const usersWithoutActiveMembership = await db.user.findMany({
      where: {
        memberships: {
          none: {
            status: MembershipStatus.ACTIVE,
          },
        },
      },
      select: { id: true },
    });

    if (usersWithoutActiveMembership.length === 0) {
      console.log("[membership] No users without active membership found");
      return;
    }

    const timezone = await db.appPreferences.findUnique({
      where: { name: "timezone" },
    });

    const businessTime = new BusinessTime(timezone?.value || "UTC");
    const startDate = businessTime.now().date;
    const endDate = businessTime.addDays(
      startDate,
      fullAccessPlan.durationDays
    );

    // 3. Assign SYSTEM_ACCESS memberships
    await db.userMembership.createMany({
      data: usersWithoutActiveMembership.map((user) => ({
        userId: user.id,
        membershipPlanId: fullAccessPlan.id,
        startDate,
        endDate,
        status: MembershipStatus.ACTIVE,
      })),
      skipDuplicates: true,
    });

    console.log(
      `[membership] SYSTEM_ACCESS assigned to ${usersWithoutActiveMembership.length} users`
    );
  },
};

export const RegisterModuleTask: AppTask = {
  name: "membership:register-module",

  async run({ db }: { db: PrismaClient }) {
    await db.modules.upsert({
      where: { name: MembershipModule.name },
      update: {},
      create: {
        name: MembershipModule.name,
        description: "membershipModuleDescription",
        isActive: true,
      },
    });
  },
};
