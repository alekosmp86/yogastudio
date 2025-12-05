import { WeeklySchedule } from "@prisma/client";
import { ScheduledClass } from "@/types/schedule/ScheduledClass";

export interface ScheduleService {
    getScheduledClasses(): Promise<WeeklySchedule[]>
    createScheduledClass(scheduledClass: Omit<ScheduledClass, "id">): Promise<WeeklySchedule>
    updateScheduledClass(scheduledClass: ScheduledClass, id: number): Promise<WeeklySchedule>
    deleteScheduledClass(id: number): Promise<number>
}