import { WeeklyScheduleService } from "../WeeklyScheduleService";
import { PrismaClient, WeeklySchedule } from "@prisma/client";

export class WeeklyScheduleServiceImpl implements WeeklyScheduleService {
    constructor(private prisma: PrismaClient) {}

    async getWeeklyScheduleByFields(fields: Pick<WeeklySchedule, "weekday" | "isActive">): Promise<WeeklySchedule[]> {
        return await this.prisma.weeklySchedule.findMany({
            where: fields,
            include: {
                template: true,
            },
        });
    }
}