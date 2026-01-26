import { hookRegistry, routeRegistry, taskRegistry } from "@/lib/registry";
import { AppModule } from "@/modules/[core]/AppModule";
import { CoreHooks } from "../[core]/CoreHooks";

export const PenaltiesModule: AppModule = {
  name: "penalties",

  initTasks() {
    taskRegistry.registerTask({
      name: "penalties:register-module",
      run: async (ctx) => {
        const { RegisterModuleTask } = await import("./tasks/PenaltyTasks");
        return RegisterModuleTask.run(ctx);
      },
    });
  },

  initCore() {
    hookRegistry.registerHook(CoreHooks.afterUserCreated, "after", (payload) =>
      import("./backend/hooks/AfterUserCreatedHook").then((m) =>
        m.afterUserCreatedHook(payload)
      )
    );
    hookRegistry.registerHook(
      CoreHooks.afterReservationCancelled,
      "after",
      (payload) =>
        import("./backend/hooks/AfterReservationCancelledHook").then((m) =>
          m.afterReservationCancelledHook(payload)
        )
    );
    hookRegistry.registerHook(
      CoreHooks.afterAttendanceUpdated,
      "after",
      (payload) =>
        import("./backend/hooks/AfterAttendanceUpdatedHook").then((m) =>
          m.afterAttendanceUpdatedHook(payload)
        )
    );
  },

  initUI() {
    // No UI slots yet
  },

  initRoutes() {
    /** Routing for pages/navigation */
    routeRegistry.registerPage(
      this.name,
      "/penalty", // The duplicate logic in middleware might need adjustment or this just registers it for the router
      () => import("./frontend/components/public/UserPenaltyPage")
    );
  },
};
