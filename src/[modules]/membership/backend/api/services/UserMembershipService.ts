import { UserMembership } from "../models/UserMembership";

export interface UserMembershipService {
  getUserMembership(id: number): Promise<UserMembership | null>;
  updateById(
    userId: number,
    userMembershipId: number,
    newMembershipPlanId: number
  ): Promise<UserMembership | null>;
  expireMembership(userMembershipId: number): Promise<void>;
}
