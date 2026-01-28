import { DailyClass } from "@/types/classes/DailyClass";

export interface CustomerClassesService {
    getClassesList(userId: number): Promise<DailyClass[]>;
}