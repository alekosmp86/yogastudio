import { GymClass } from "@/types/classes/GymClass";
import { ClassesService } from "../ClassesService";
import { ClassTemplate } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class ClassesServiceImpl implements ClassesService {

    async getAllClasses(): Promise<ClassTemplate[]> {
        return prisma.classTemplate.findMany();
    }

    async createClass(template: Omit<GymClass, "id">): Promise<ClassTemplate> {
        return prisma.classTemplate.create({ data: template });
    }

    async updateClass(template: ClassTemplate): Promise<ClassTemplate> {
        return prisma.classTemplate.update({ where: { id: template.id }, data: template });
    }

    async deleteClass(id: number): Promise<number> {
        await prisma.classTemplate.delete({ where: { id } });
        return id;
    }
}