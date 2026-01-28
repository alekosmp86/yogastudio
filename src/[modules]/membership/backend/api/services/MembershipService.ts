import { Membership } from "../models/Membership";
import { MembershipDetails } from "../models/MembershipDetails";

export interface MembershipService {
  createMembership(payload: Membership): Promise<Membership>;
  getMembershipPlans(): Promise<Membership[]>;
  getMembershipPlanById(id: number): Promise<Membership | null>;
  updateMembershipPlan(id: number, data: Partial<Membership>): Promise<Membership>;
  deleteMembershipPlan(id: number): Promise<Membership>;
  getMembershipDetails(userId: number): Promise<MembershipDetails | null>;
}
