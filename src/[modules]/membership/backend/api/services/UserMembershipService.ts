import { UserMembership } from "../models/UserMembership";

export interface UserMembershipService {
    getUserMembership(id: number): Promise<UserMembership | null>;
    updateById(userMembershipId: number, newMembershipPlanId: number): Promise<UserMembership | null>;
}