import { PrismaClient } from "@prisma/client";
import { ScheduleService } from "../ScheduleService";
import { WeeklySchedule } from "@prisma/client";
import { ScheduledClass } from "@/types/schedule/ScheduledClass";

export class ScheduleServiceImpl implements ScheduleService {
  constructor(private readonly prisma: PrismaClient) {}

  async getScheduledClasses(): Promise<WeeklySchedule[]> {
    return await this.prisma.weeklySchedule.findMany();
  }

  async createScheduledClass(scheduledClass: Omit<ScheduledClass, "id">): Promise<WeeklySchedule> {
    return await this.prisma.weeklySchedule.create({
      data: {
        templateId: scheduledClass.classId,
        weekday: scheduledClass.weekday,
        startTime: scheduledClass.hour,
      },
    });
  }

  async updateScheduledClass(scheduledClass: ScheduledClass, id: number): Promise<WeeklySchedule> {
    console.log("Updating schedule:", JSON.stringify(scheduledClass));
    return await this.prisma.weeklySchedule.update({
      where: {
        templateId_weekday_startTime: {
          templateId: id,
          weekday: scheduledClass.weekday,
          startTime: scheduledClass.hour,
        },
      },
      data: {
        templateId: scheduledClass.classId,
      },
    });
  }

  async deleteScheduledClass(id: number): Promise<number> {
    await this.prisma.weeklySchedule.delete({ where: { id } });
    return id;
  }
}
