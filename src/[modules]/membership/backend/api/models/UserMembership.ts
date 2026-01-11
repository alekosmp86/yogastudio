import { Membership } from "./Membership";

export type UserMembership = {
    id: number;
    userId: number;
    membershipPlanId: number;
    status: string;
    membershipPlan: Membership;
    startDate: string;
    endDate: string;
}