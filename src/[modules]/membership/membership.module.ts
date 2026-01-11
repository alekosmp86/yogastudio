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
import { UserMembershipSection } from "./frontend/components/owner/users/UserMembershipSection";
import ActivitiesSelectionForm from "./frontend/components/customer/profile/ActivitiesSelectionForm";

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

    uiRegistry.registerUI(
      CoreUiSlots.OwnerUsersDetails,
      UserMembershipSection
    );

    uiRegistry.registerUI(
      CoreUiSlots.CustomerProfileCompletion,
      ActivitiesSelectionForm
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
      () => import("./backend/api/handlers/membership/FetchPostHandler")
    );

    routeRegistry.registerApi(
      this.name,
      "plans/:id",
      () =>
        import("./backend/api/handlers/membership/FetchUpdateDeleteByIdHandler")
    );

    routeRegistry.registerApi(
      this.name,
      "plans/user/:id",
      () => import("./backend/api/handlers/user-membership/FetchUpdateHandler")
    );

    routeRegistry.registerApi(
      this.name,
      "plans/user/:id/activities",
      () => import("./backend/api/handlers/activities/FetchPostActivitiesByIdHandler")
    );
  },
};
