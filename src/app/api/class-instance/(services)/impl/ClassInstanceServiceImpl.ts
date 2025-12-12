import { ClassInstanceService } from "../ClassInstanceService";
import { PrismaClient } from "@prisma/client";
import { ClassInstance } from "@prisma/client";

export class ClassInstanceServiceImpl implements ClassInstanceService {
    constructor(private prisma: PrismaClient) {}

    async findFirstByFields(fields: Pick<ClassInstance, "templateId" | "startTime" | "date">): Promise<ClassInstance | null> {
        return await this.prisma.classInstance.findFirst({
            where: fields,
        });
    }

    async create(data: { templateId: number; startTime: string; date: Date }): Promise<ClassInstance> {
        return await this.prisma.classInstance.create({
            data: {
                templateId: data.templateId,
                startTime: data.startTime,
                date: data.date,
            },
        });
    }
}