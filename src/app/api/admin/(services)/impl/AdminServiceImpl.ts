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
    const weekday = getTodayWeekday();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const createdInstances: ClassInstance[] = [];
    
    // 1. Get all active schedules for today
    const schedules = await weeklyScheduleService.getWeeklyScheduleByFields({
      weekday,
      isActive: true,
    });

    if (!schedules.length) {
      return createdInstances;
    }

    for (const schedule of schedules) {
      const existing = await classInstanceService.findFirstByFields({
        templateId: schedule.templateId,
        startTime: schedule.startTime,
        date: today,
      });

      if (!existing) {
        const newInstance = await classInstanceService.create({
          date: today,
          startTime: schedule.startTime,
          templateId: schedule.templateId,
        });

        createdInstances.push(newInstance);
      }
    }

    return createdInstances;
  }
}