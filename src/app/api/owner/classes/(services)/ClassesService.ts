import { ClassTemplate } from "@prisma/client";
import { ClassesDto } from "../(dto)/ClassesDto";

export interface ClassesService {
    getAllClasses(): Promise<ClassTemplate[]>
    createClass(template: Omit<ClassesDto, "id">): Promise<ClassTemplate>
    updateClass(template: ClassTemplate): Promise<ClassTemplate>
    deleteClass(id: number): Promise<number>
}