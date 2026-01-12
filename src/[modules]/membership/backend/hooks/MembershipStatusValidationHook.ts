import { User } from "@prisma/client";
import { BusinessTime } from "@/lib/utils/date";
import { userMembershipService } from "../api";
import { PreferenceServiceImpl } from "app/api/owner/preferences/_services/impl/PreferenceServiceImpl";
import { UserServiceImpl } from "app/api/users/_services/impl/UserServiceImpl";
import { UserActions } from "@/enums/UserActions";

const preferenceService = new PreferenceServiceImpl();
const userService = new UserServiceImpl();

export const membershipStatusValidationHook = async (payload: User) => {
  const { id } = payload;
  if (!payload.approved) {
    return payload;
  }

  const timezone = await preferenceService.getStringPreferenceValue("timezone");
  const businessTime = new BusinessTime(timezone);
  const today = businessTime.now().date;
  const userMembership = await userMembershipService.getUserMembership(id);

  if (userMembership && userMembership.endDate < today) {
    const updatedUser = await userService.executeAction<User>(
      id,
      UserActions.BLOCK_USER
    );
    await userMembershipService.expireMembership(userMembership.id);
    return updatedUser;
  }

  return payload;
};
