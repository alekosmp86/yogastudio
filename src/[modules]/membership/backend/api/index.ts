import { MembershipServiceImpl } from "./services/impl/MembershipServiceImpl";
import { UserActivityServiceImpl } from "./services/impl/UserActivityServiceImpl";
import { UserMembershipServiceImpl } from "./services/impl/UserMembershipServiceImpl";

export const membershipService = new MembershipServiceImpl();
export const userMembershipService = new UserMembershipServiceImpl();
export const userActivityService = new UserActivityServiceImpl();
