import { PrismaClient } from "@prisma/client";
import { AppTask } from "@/tasks/TaskType";

class TaskRegistry {
  private tasks: Map<string, AppTask> = new Map();

  registerTask(task: AppTask) {
    if (this.tasks.has(task.name)) {
      console.warn(`Task ${task.name} is already registered. Overwriting.`);
    }
    this.tasks.set(task.name, task);
  }

  async runTasks(taskNames?: string[]) {
    const db = new PrismaClient();

    try {
      const allTasks = Array.from(this.tasks.values());
      const selectedTasks = taskNames?.length
        ? allTasks.filter((t) => taskNames.includes(t.name))
        : allTasks;

      if (selectedTasks.length === 0) {
        if (taskNames?.length) {
          console.warn(
            `No tasks found strictly matching: ${taskNames.join(", ")}`
          );
        } else {
          console.log("No tasks registered or selected to run.");
        }
        return;
      }

      for (const task of selectedTasks) {
        console.log(`▶ Running task: ${task.name}`);
        try {
          await task.run({ db });
          console.log(`✔ Completed: ${task.name}`);
        } catch (error) {
          console.error(`✖ Failed: ${task.name}`, error);
          throw error;
        }
      }
    } finally {
      await db.$disconnect();
    }
  }
}

export const taskRegistry = new TaskRegistry();
