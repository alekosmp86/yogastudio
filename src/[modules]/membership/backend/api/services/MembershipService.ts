import { Membership } from "../models/Membership";

export interface MembershipService {
    createMembership(payload: Membership): Promise<Membership>;
    getMembershipPlans(): Promise<Membership[]>;
}
    