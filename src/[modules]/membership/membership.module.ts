import { hookRegistry, uiRegistry } from "@/lib/hooks";
import { CoreHooks } from "@/modules/[core]/CoreHooks";
import { AppModule } from "@/modules/[core]/AppModule";
import { fetchClassesByMembershipPostHook } from "./backend/hooks/FetchClassesByMembershipPostHook";
import { userCreatedGoogleOauthPostHook } from "./backend/hooks/UserCreatedGoogleOauthPostHook";
import { CoreUiSlots } from "../[core]/CoreUiSlots";
import MembershipDashboardCard from "./frontend/components/owner/MembershipDashboardCard";
import dynamic from "next/dynamic";

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
    console.log("MembershipModule.initUI");
    uiRegistry.registerUI(
      CoreUiSlots.OwnerDashboardCards,
      MembershipDashboardCard
    );
  },

  pages: [
    {
      path: ["list"],
      component: dynamic(() => import("./pages/MembershipList"), { ssr: false }),
    },
  ],
};
