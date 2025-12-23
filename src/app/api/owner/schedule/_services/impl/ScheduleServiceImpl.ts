import { ScheduleService } from "../ScheduleService";
import { WeeklySchedule } from "@prisma/client";
import { ScheduledClass } from "@/types/schedule/ScheduledClass";
import { prisma } from "@/lib/prisma";

export class ScheduleServiceImpl implements ScheduleService {

  async getScheduledClasses(): Promise<WeeklySchedule[]> {
    return await prisma.weeklySchedule.findMany();
  }

  async createScheduledClass(scheduledClass: Omit<ScheduledClass, "id">): Promise<WeeklySchedule> {
    return await prisma.weeklySchedule.create({
      data: {
        templateId: scheduledClass.classId,
        weekday: scheduledClass.weekday,
        startTime: scheduledClass.hour,
      },
    });
  }

  async updateScheduledClass(scheduledClass: ScheduledClass, id: number): Promise<WeeklySchedule> {
    console.log("Updating schedule:", JSON.stringify(scheduledClass));
    return await prisma.weeklySchedule.update({
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
    await prisma.weeklySchedule.delete({ where: { id } });
    return id;
  }
}
