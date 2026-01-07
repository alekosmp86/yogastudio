import fs from "node:fs";
import path from "node:path";
import { runTasks } from "./TaskRunner";
import { pathToFileURL } from "node:url";

async function loadModules() {
  const modulesDir = path.join(__dirname, "../[modules]");

  const moduleNames = fs.readdirSync(modulesDir);

  for (const moduleName of moduleNames) {
    const entry = path.join(modulesDir, moduleName, "index.ts");

    if (fs.existsSync(entry)) {
      await import(pathToFileURL(entry).href);
    }
  }
}

async function main() {
  await loadModules();

  const taskNames = process.argv.slice(2);
  await runTasks(taskNames);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
