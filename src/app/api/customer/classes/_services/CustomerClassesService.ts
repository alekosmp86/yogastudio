import { DailyClass } from "@/types/classes/DailyClass";

export interface CustomerClassesService {
    getClassesList(): Promise<DailyClass[]>;
}