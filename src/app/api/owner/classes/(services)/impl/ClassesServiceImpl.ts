import { GymClass } from "@/types/classes/GymClass";
import { ClassesService } from "../ClassesService";
import { ClassTemplate, PrismaClient } from "@prisma/client";

export class ClassesServiceImpl implements ClassesService {
    constructor(private prisma: PrismaClient) {}

    async getAllClasses(): Promise<ClassTemplate[]> {
        return this.prisma.classTemplate.findMany();
    }

    async createClass(template: Omit<GymClass, "id">): Promise<ClassTemplate> {
        return this.prisma.classTemplate.create({ data: template });
    }

    async updateClass(template: ClassTemplate): Promise<ClassTemplate> {
        return this.prisma.classTemplate.update({ where: { id: template.id }, data: template });
    }

    async deleteClass(id: number): Promise<number> {
        await this.prisma.classTemplate.delete({ where: { id } });
        return id;
    }
}