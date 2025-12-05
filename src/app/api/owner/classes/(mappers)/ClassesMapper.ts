import { ClassTemplate } from "@prisma/client";
import { GymClass } from "@/types/classes/GymClass";

export interface ClassesMapper {
    toClassTemplate(classDto: GymClass): ClassTemplate;
    toClassesDto(classTemplate: ClassTemplate): GymClass;
}