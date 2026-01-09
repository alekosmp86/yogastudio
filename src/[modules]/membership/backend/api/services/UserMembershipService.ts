import { UserMembership } from "../models/UserMembership";

export interface UserMembershipService {
    getUserMembership(id: number): Promise<UserMembership | null>;
}