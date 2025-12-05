import { ClassTemplate } from "@prisma/client";
import { GymClass } from "@/types/classes/GymClass";

export interface ClassesService {
    getAllClasses(): Promise<ClassTemplate[]>
    createClass(template: Omit<GymClass, "id">): Promise<ClassTemplate>
    updateClass(template: ClassTemplate): Promise<ClassTemplate>
    deleteClass(id: number): Promise<number>
}