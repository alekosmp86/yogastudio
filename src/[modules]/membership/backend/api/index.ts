import { MembershipServiceImpl } from "./services/impl/MembershipServiceImpl";
import { UserMembershipServiceImpl } from "./services/impl/UserMembershipServiceImpl";

export const membershipService = new MembershipServiceImpl();
export const userMembershipService = new UserMembershipServiceImpl();
