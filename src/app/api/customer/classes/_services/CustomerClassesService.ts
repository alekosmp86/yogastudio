import { DailyClass } from "@/types/classes/DailyClass";

export interface CustomerClassesService {
    getTodayClasses(): Promise<DailyClass[]>;
}