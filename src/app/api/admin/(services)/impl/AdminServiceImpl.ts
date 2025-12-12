import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";
import { scheduledTasks } from "../../ScheduledTasks";
import { AdminService } from "../AdminService";

export class AdminServiceImpl implements AdminService {
  constructor(private logger: ConsoleLogger) {}

  async runScheduledTasks(): Promise<void> {
    for (const task of scheduledTasks) {
      this.logger.log(`Running task: ${task.taskName}`);
      await task.run();
      this.logger.log(`Task ${task.taskName} completed`);
    }
  }
}