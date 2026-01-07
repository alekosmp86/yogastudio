import { hookRegistry } from "@/lib/hooks";
import { CoreHooks } from "@/enums/CoreHooks";
import { AppModule } from "AppModule";
import { fetchClassesByMembershipPostHook } from "./backend/hooks/FetchClassesByMembershipPostHook";
import { userCreatedGoogleOauthPostHook } from "./backend/hooks/UserCreatedGoogleOauthPostHook";

export const MembershipModule: AppModule = {
  init() {
    hookRegistry.registerHook(CoreHooks.postFetchAllAvailableClasses, fetchClassesByMembershipPostHook);
    hookRegistry.registerHook(CoreHooks.postUserCreatedGoogleOauth, userCreatedGoogleOauthPostHook);
  },
};
