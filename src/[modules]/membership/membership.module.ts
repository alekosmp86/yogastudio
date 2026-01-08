import { hookRegistry, routeRegistry, uiRegistry } from "@/lib/registry";
import { CoreHooks } from "@/modules/[core]/CoreHooks";
import { AppModule } from "@/modules/[core]/AppModule";
import { fetchClassesByMembershipPostHook } from "./backend/hooks/FetchClassesByMembershipPostHook";
import { userCreatedGoogleOauthPostHook } from "./backend/hooks/UserCreatedGoogleOauthPostHook";
import { CoreUiSlots } from "../[core]/CoreUiSlots";
import MembershipDashboardCard from "./frontend/components/owner/dashboard/MembershipDashboardCard";

export const MembershipModule: AppModule = {
  name: "membership",

  initCore() {
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

  initUI() {
    uiRegistry.registerUI(
      CoreUiSlots.OwnerDashboardCards,
      MembershipDashboardCard
    );
  },

  initRoutes() {
    routeRegistry.registerPage(
      this.name,
      "",
      () =>
        import(
          "./frontend/components/owner/membership-manager/MembershipManager"
        )
    );
  },
};
