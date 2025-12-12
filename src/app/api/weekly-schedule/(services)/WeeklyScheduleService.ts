import { WeeklySchedule } from "@prisma/client";

export interface WeeklyScheduleService {
    getWeeklyScheduleByFields(fields: Pick<WeeklySchedule, "weekday" | "isActive">): Promise<WeeklySchedule[]>;
}