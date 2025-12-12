import { ClassInstance } from "@prisma/client";

export interface ClassInstanceService {
    findFirstByFields(fields: Pick<ClassInstance, "templateId" | "startTime" | "date">): Promise<ClassInstance | null>;
    create(data: { templateId: number; startTime: string; date: Date }): Promise<ClassInstance>;
}