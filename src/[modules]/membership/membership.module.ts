import {
  hookRegistry,
  routeRegistry,
  taskRegistry,
  uiRegistry,
} from "@/lib/registry";
import { CoreHooks } from "@/modules/[core]/CoreHooks";
import { AppModule } from "@/modules/[core]/AppModule";
import { CoreUiSlots } from "../[core]/CoreUiSlots";
import MembershipDashboardCard from "./frontend/components/owner/dashboard/MembershipDashboardCard";
import { UserMembershipSection } from "./frontend/components/owner/users/UserMembershipSection";
import ActivitiesSelectionForm from "./frontend/components/customer/profile/ActivitiesSelectionForm";

export const MembershipModule: AppModule = {
  name: "membership",

  initTasks() {
    taskRegistry.registerTask({
      name: "membership:register-module",
      run: async (ctx) => {
        const { RegisterModuleTask } = await import("./tasks/MembershipTasks");
        return RegisterModuleTask.run(ctx);
      },
    });
    taskRegistry.registerTask({
      name: "membership:assign-system-access-to-users-without-membership",
      run: async (ctx) => {
        const { AssignSystemAccessTask } =
          await import("./tasks/MembershipTasks");
        return AssignSystemAccessTask.run(ctx);
      },
    });
  },

  initCore() {
    hookRegistry.registerHook(
      CoreHooks.afterFetchAllAvailableClasses,
      "after",
      (payload) =>
        import("./backend/hooks/FetchClassesByMembershipPostHook").then((m) =>
          m.fetchClassesByMembershipPostHook(payload),
        ),
    );
    hookRegistry.registerHook(CoreHooks.afterUserCreated, "after", (payload) =>
      import("./backend/hooks/UserCreatedGoogleOauthPostHook").then((m) =>
        m.userCreatedGoogleOauthPostHook(payload),
      ),
    );
    hookRegistry.registerHook(
      CoreHooks.beforeSessionCreated,
      "before",
      (payload) =>
        import("./backend/hooks/MembershipStatusValidationHook").then((m) =>
          m.membershipStatusValidationHook(payload),
        ),
    );
    hookRegistry.registerHook(
      CoreHooks.afterNextClassFetched,
      "after",
      (payload) =>
        import("./backend/hooks/AfterNextClassFetchedHook").then((m) =>
          m.afterNextClassFetchedHook(payload),
        ),
    );
  },

  initUI() {
    uiRegistry.registerUI(
      CoreUiSlots.OwnerDashboardCards,
      MembershipDashboardCard,
    );

    uiRegistry.registerUI(CoreUiSlots.OwnerUsersDetails, UserMembershipSection);

    uiRegistry.registerUI(
      CoreUiSlots.CustomerProfileCompletion,
      ActivitiesSelectionForm,
    );
  },

  initRoutes() {
    /** Routing for pages/navigation */
    routeRegistry.registerPage(
      this.name,
      "",
      () =>
        import("./frontend/components/owner/membership-manager/MembershipManager"),
    );

    routeRegistry.registerPage(
      this.name,
      "create",
      () =>
        import("./frontend/components/owner/forms/MembershipCreateEditForm"),
    );

    routeRegistry.registerPage(
      this.name,
      "edit/:id",
      () =>
        import("./frontend/components/owner/forms/MembershipCreateEditForm"),
    );

    /** Routing for API endpoints */
    routeRegistry.registerApi(
      this.name,
      "plans",
      () => import("./backend/api/handlers/membership/FetchPostHandler"),
    );

    routeRegistry.registerApi(
      this.name,
      "plans/:id",
      () =>
        import("./backend/api/handlers/membership/FetchUpdateDeleteByIdHandler"),
    );

    routeRegistry.registerApi(
      this.name,
      "plans/user/:id",
      () => import("./backend/api/handlers/user-membership/FetchUpdateHandler"),
    );

    routeRegistry.registerApi(
      this.name,
      "plans/user/:id/activities",
      () =>
        import("./backend/api/handlers/activities/FetchPostActivitiesByIdHandler"),
    );
  },
};
