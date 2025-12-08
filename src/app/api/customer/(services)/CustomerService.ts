import { ScheduledClassExtended } from "@/types/schedule/ScheduledClassExtended";

export interface CustomerService {
    getTodayClasses(): Promise<ScheduledClassExtended[]>;
}