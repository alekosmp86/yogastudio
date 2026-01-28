import { ClassTemplate, MembershipPlan } from "@prisma/client";

export type MembershipDetails = {
  membershipPlan: MembershipPlan;
  activities: ClassTemplate[];
} & {
  id: number;
  userId: number;
  membershipPlanId: number;
  startDate: string;
  endDate: string;
  status: string;
};
