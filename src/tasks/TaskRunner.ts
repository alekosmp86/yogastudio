import { PrismaClient } from "@prisma/client";
import { AppTask } from "./TaskType";

const tasks: AppTask[] = [];

export function registerTask(task: AppTask) {
  tasks.push(task);
}

export async function runTasks(taskNames?: string[]) {
  const db = new PrismaClient();

  try {
    const selectedTasks = taskNames?.length
      ? tasks.filter(t => taskNames.includes(t.name))
      : tasks;

    for (const task of selectedTasks) {
      console.log(`▶ Running task: ${task.name}`);
      await task.run({ db });
      console.log(`✔ Completed: ${task.name}`);
    }
  } finally {
    await db.$disconnect();
  }
}
