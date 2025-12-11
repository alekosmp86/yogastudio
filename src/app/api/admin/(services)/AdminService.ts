export interface AdminService {
    runScheduledTasks(): Promise<void>;
}