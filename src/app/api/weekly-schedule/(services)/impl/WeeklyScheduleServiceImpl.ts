import { prisma } from "@/lib/prisma";
import { WeeklyScheduleService } from "../WeeklyScheduleService";
import { WeeklySchedule } from "@prisma/client";

export class WeeklyScheduleServiceImpl implements WeeklyScheduleService {

    async getWeeklyScheduleByFields(fields: Pick<WeeklySchedule, "weekday" | "isActive">): Promise<WeeklySchedule[]> {
        return await prisma.weeklySchedule.findMany({
            where: fields,
            include: {
                template: true,
            },
        });
    }
}