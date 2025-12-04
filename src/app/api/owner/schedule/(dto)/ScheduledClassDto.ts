import { WeeklySchedule } from "@prisma/client";

export class ScheduledClassDto {
  constructor(
    public id: number,
    public classId: number,
    public weekday: number,
    public hour: string
  ) {}

  static fromWeeklySchedule(schedule: WeeklySchedule): ScheduledClassDto {
    return new ScheduledClassDto(
      schedule.id,
      schedule.templateId,
      schedule.weekday,
      schedule.startTime
    );
  }
}
