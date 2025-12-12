import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";
import { scheduledTasks } from "../../ScheduledTasks";
import { AdminService } from "../AdminService";
import { classInstanceService, weeklyScheduleService } from "app/api";
import { getTodayWeekday } from "@/lib/utils";
import { ClassInstance } from "@prisma/client";

export class AdminServiceImpl implements AdminService {
  private logger = new ConsoleLogger(this.constructor.name);

  async runScheduledTasks(): Promise<void> {
    for (const task of scheduledTasks) {
      this.logger.log(`Running task: "${task.taskName}"`);
      await task.run();
      this.logger.log(`Task "${task.taskName}" completed`);
    }
  }

  async generateDailyClasses(): Promise<ClassInstance[]> {
    this.logger.log("Starting generateDailyClasses()");

    try {
      const weekday = getTodayWeekday();
      const todayLocal = new Date();
      todayLocal.setHours(0, 0, 0, 0);

      const createdInstances: ClassInstance[] = [];

      // 1. Get all active schedules for today
      const schedules = await weeklyScheduleService.getWeeklyScheduleByFields({
        weekday,
        isActive: true,
      });

      this.logger.log(`Found ${schedules.length} schedules for today`);

      if (!schedules.length) {
        return createdInstances;
      }

      for (const schedule of schedules) {
        const existing = await classInstanceService.findFirstByFields({
          templateId: schedule.templateId,
          startTime: schedule.startTime,
          date: todayLocal,
        });

        if (!existing) {
          const newInstance = await classInstanceService.create({
            date: todayLocal,
            startTime: schedule.startTime,
            templateId: schedule.templateId,
          });

          createdInstances.push(newInstance);
        }
      }

      this.logger.log(`Created ${createdInstances.length} class instances`);
      return createdInstances;
    } catch (e) {
      this.logger.error(`Error in generateDailyClasses(): ${e}`);
      throw e;
    }
  }
}
