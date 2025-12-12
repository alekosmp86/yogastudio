import { ClassInstance } from "@prisma/client";

export interface AdminService {
    runScheduledTasks(): Promise<void>;
    generateDailyClasses(): Promise<ClassInstance[]>;
}