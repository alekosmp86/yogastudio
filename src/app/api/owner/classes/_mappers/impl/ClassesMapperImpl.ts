import { ClassTemplate } from "@prisma/client";
import { GymClass } from "@/types/classes/GymClass";
import { ClassesMapper } from "../ClassesMapper";

export class ClassesMapperImpl implements ClassesMapper {
    toClassTemplate(classDto: GymClass): ClassTemplate {
        return {
            id: classDto.id,
            title: classDto.title,
            description: classDto.description || '',
            capacity: classDto.capacity,
            instructor: classDto.instructor,
        };
    }
    toClassesDto(classTemplate: ClassTemplate): GymClass {
        return {
            id: classTemplate.id,
            title: classTemplate.title,
            description: classTemplate.description || '',
            capacity: classTemplate.capacity,
            instructor: classTemplate.instructor,
        };
    }
}