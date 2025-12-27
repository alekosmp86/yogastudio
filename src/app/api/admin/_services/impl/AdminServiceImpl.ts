import { ConsoleLogger } from "app/api/logger/_services/impl/ConsoleLogger";
import { scheduledTasks } from "../../ScheduledTasks";
import { AdminService } from "../AdminService";
import {
  classInstanceService,
  preferenceService,
  weeklyScheduleService,
} from "app/api";
import { ClassInstance } from "@prisma/client";
import { DateUtils } from "@/lib/utils/date";

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
      const daysToGenerate = await preferenceService.getPreferenceValue<number>(
        "generateClassesForXDays"
      );

      const today = DateUtils.startOfDay(new Date());
      const createdInstances: ClassInstance[] = [];

      for (let offset = 0; offset < daysToGenerate; offset++) {
        const date = DateUtils.addDays(today, offset);
        console.log(`Processing ${date.toDateString()}`);
        const weekday = DateUtils.getWeekday(date);
        console.log(`Weekday: ${weekday}`);

        // 1. Get schedules for this weekday
        const schedules = await weeklyScheduleService.getWeeklyScheduleByFields(
          {
            weekday,
            isActive: true,
          }
        );

        if (!schedules.length) {
          continue;
        }

        this.logger.log(
          `Processing ${schedules.length} schedules for ${date.toDateString()}`
        );

        // 2. Create instances if missing
        for (const schedule of schedules) {
          const existing = await classInstanceService.findFirstByFields({
            templateId: schedule.templateId,
            startTime: schedule.startTime,
            date,
          });

          if (existing) continue;

          const instance = await classInstanceService.create({
            date,
            startTime: schedule.startTime,
            templateId: schedule.templateId,
          });

          createdInstances.push(instance);
        }
      }

      this.logger.log(
        `generateDailyClasses(): created ${createdInstances.length} class instances`
      );

      return createdInstances;
    } catch (e) {
      this.logger.error(`Error in generateDailyClasses(): ${e}`);
      throw e;
    }
  }
}
