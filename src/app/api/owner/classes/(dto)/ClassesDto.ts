import { ClassTemplate } from "@prisma/client";

export class ClassesDto {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public capacity: number,
        public instructor: string
    ) {}

    static fromClassTemplate(classTemplate: ClassTemplate): ClassesDto {
        return new ClassesDto(
            classTemplate.id,
            classTemplate.title,
            classTemplate.description || "",
            classTemplate.capacity,
            classTemplate.instructor
        );
    }
}