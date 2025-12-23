import { ScheduleMapper } from "../ScheduleMapper";
import { WeeklySchedule } from "@prisma/client";
import { ScheduledClass } from "@/types/schedule/ScheduledClass";

export class ScheduleMapperImpl implements ScheduleMapper {
  toScheduledClass(schedule: WeeklySchedule): ScheduledClass {
    return {
      id: schedule.id,
      classId: schedule.templateId,
      weekday: schedule.weekday,
      hour: schedule.startTime,
    };
  }
}
