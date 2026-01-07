import { hookRegistry } from "@/lib/hooks";
import { CoreHooks } from "@/modules/[core]/CoreHooks";
import { AppModule } from "AppModule";
import { fetchClassesByMembershipPostHook } from "./backend/hooks/FetchClassesByMembershipPostHook";
import { userCreatedGoogleOauthPostHook } from "./backend/hooks/UserCreatedGoogleOauthPostHook";

export const MembershipModule: AppModule = {
  init() {
    hookRegistry.registerHook(
      CoreHooks.afterFetchAllAvailableClasses,
      "after",
      fetchClassesByMembershipPostHook
    );
    hookRegistry.registerHook(
      CoreHooks.afterUserCreated,
      "after",
      userCreatedGoogleOauthPostHook
    );
  },
};
