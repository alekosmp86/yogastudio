import { WeeklySchedule } from "@prisma/client";
import { ScheduledClassDto } from "../(dto)/ScheduledClassDto";

export interface ScheduleService {
    getScheduledClasses(): Promise<WeeklySchedule[]>
    createScheduledClass(scheduledClass: Omit<ScheduledClassDto, "id">): Promise<WeeklySchedule>
    updateScheduledClass(scheduledClass: ScheduledClassDto, id: number): Promise<WeeklySchedule>
    deleteScheduledClass(id: number): Promise<number>
}