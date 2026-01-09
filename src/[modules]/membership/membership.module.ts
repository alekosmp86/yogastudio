import {
  hookRegistry,
  routeRegistry,
  taskRegistry,
  uiRegistry,
} from "@/lib/registry";
import { CoreHooks } from "@/modules/[core]/CoreHooks";
import { AppModule } from "@/modules/[core]/AppModule";
import { fetchClassesByMembershipPostHook } from "./backend/hooks/FetchClassesByMembershipPostHook";
import { userCreatedGoogleOauthPostHook } from "./backend/hooks/UserCreatedGoogleOauthPostHook";
import { CoreUiSlots } from "../[core]/CoreUiSlots";
import MembershipDashboardCard from "./frontend/components/owner/dashboard/MembershipDashboardCard";
import { AssignSystemAccessTask, RegisterModuleTask } from "./tasks/MembershipTasks";

export const MembershipModule: AppModule = {
  name: "membership",

  initTasks() {
    taskRegistry.registerTask(RegisterModuleTask);
    taskRegistry.registerTask(AssignSystemAccessTask);
  },

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
    /** Routing for pages/navigation */
    routeRegistry.registerPage(
      this.name,
      "",
      () =>
        import(
          "./frontend/components/owner/membership-manager/MembershipManager"
        )
    );

    routeRegistry.registerPage(
      this.name,
      "create",
      () => import("./frontend/components/owner/forms/MembershipCreateEditForm")
    );

    routeRegistry.registerPage(
      this.name,
      "edit/:id",
      () => import("./frontend/components/owner/forms/MembershipCreateEditForm")
    );

    /** Routing for API endpoints */
    routeRegistry.registerApi(
      this.name,
      "plans",
      () => import("./backend/api/handlers/FetchPostHandler")
    );

    routeRegistry.registerApi(
      this.name,
      "plans/:id",
      () =>
        import("./backend/api/handlers/FetchUpdateDeleteByIdHandler")
    );
  },
};
