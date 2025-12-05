import { ScheduledClass } from "@/types/schedule/ScheduledClass";
import { WeeklySchedule } from "@prisma/client";

export interface ScheduleMapper {
    toScheduledClass(schedule: WeeklySchedule): ScheduledClass;
}