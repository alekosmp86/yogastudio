import { Membership } from "../models/Membership";

export interface MembershipService {
  createMembership(payload: Membership): Promise<Membership>;
  getMembershipPlans(): Promise<Membership[]>;
  getMembershipPlanById(id: number): Promise<Membership | null>;
  updateMembershipPlan(id: number, data: Partial<Membership>): Promise<Membership>;
}
