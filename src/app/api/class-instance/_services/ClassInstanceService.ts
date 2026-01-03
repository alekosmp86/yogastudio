import { NextClass } from "@/types/classes/NextClass";
import { ClassInstance } from "@prisma/client";

export interface ClassInstanceService {
    findFirstByFields(fields: Pick<ClassInstance, "templateId" | "startTime" | "date">): Promise<ClassInstance | null>;
    create(data: { templateId: number; startTime: string; date: string }): Promise<ClassInstance>;
    getNextClass(): Promise<NextClass | null>;
}