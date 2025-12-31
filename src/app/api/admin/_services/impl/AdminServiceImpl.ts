import { ConsoleLogger } from "app/api/logger/_services/impl/ConsoleLogger";
import { scheduledTasks } from "../../ScheduledTasks";
import { AdminService } from "../AdminService";
import {
  classInstanceService,
  preferenceService,
  weeklyScheduleService,
} from "app/api";
import { ClassInstance } from "@prisma/client";
import DayjsUtils from "@/lib/utils/dayjs";
import dayjs from "dayjs";

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
      const daysToGenerate = await preferenceService.getNumberPreferenceValue(
        "generateClassesForXDays"
      );
      const timezone = await preferenceService.getStringPreferenceValue(
        "timezone"
      );

      const today = DayjsUtils.startOfDay(dayjs(), timezone);
      const createdInstances: ClassInstance[] = [];

      for (let offset = 0; offset < daysToGenerate; offset++) {
        const date = DayjsUtils.addDays(today, offset, timezone);
        console.log(`Processing ${date.format("YYYY-MM-DD")}`);
        const weekday = DayjsUtils.getWeekday(date);

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
          `Processing ${schedules.length} schedules for ${date.format("YYYY-MM-DD")}`
        );

        // 2. Create instances if missing
        for (const schedule of schedules) {
          const existing = await classInstanceService.findFirstByFields({
            templateId: schedule.templateId,
            startTime: schedule.startTime,
            date: date.format("YYYY-MM-DD"),
          });

          if (existing) continue;

          const instance = await classInstanceService.create({
            date: date.format("YYYY-MM-DD"),
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
