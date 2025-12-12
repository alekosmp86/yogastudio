import { ClassInstanceService } from "../ClassInstanceService";
import { ClassInstance } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class ClassInstanceServiceImpl implements ClassInstanceService { 

    async findFirstByFields(fields: Pick<ClassInstance, "templateId" | "startTime" | "date">): Promise<ClassInstance | null> {
        return await prisma.classInstance.findFirst({
            where: fields,
        });
    }

    async create(data: { templateId: number; startTime: string; date: Date }): Promise<ClassInstance> {
        return await prisma.classInstance.create({
            data: {
                templateId: data.templateId,
                startTime: data.startTime,
                date: data.date,
            },
        });
    }
}