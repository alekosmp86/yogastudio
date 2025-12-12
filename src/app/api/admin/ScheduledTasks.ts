import { adminService } from ".";

export const scheduledTasks = [{
    taskName: "Create daily classes",
    run: async () => {
        adminService.generateDailyClasses();
    }
}]