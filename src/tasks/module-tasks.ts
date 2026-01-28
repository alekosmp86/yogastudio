import fs from "node:fs";
import path from "node:path";
import { taskRegistry } from "@/lib/registry/taskRegistry";
import { pathToFileURL } from "node:url";
import { AppModule } from "@/modules/[core]/AppModule";

async function loadModules() {
  const modulesDir = path.join(__dirname, "../[modules]");

  const moduleNames = fs.readdirSync(modulesDir);

  for (const moduleName of moduleNames) {
    const entry = path.join(modulesDir, moduleName, "index.ts");

    if (fs.existsSync(entry)) {
      // Import the module file
      const moduleExports = await import(pathToFileURL(entry).href);

      // We expect the module to export something that matches AppModule interface
      // or at least iterate through exports to find one.
      // In our pattern, we export something like MembershipModule.

      for (const exportKey in moduleExports) {
        const exportedItem = moduleExports[exportKey] as AppModule;

        if (
          exportedItem &&
          typeof exportedItem === "object" &&
          typeof exportedItem.initTasks === "function"
        ) {
          console.log(`Loading tasks for module: ${exportedItem.name}`);
          exportedItem.initTasks();
        }
      }
    }
  }
}

async function main() {
  await loadModules();

  const taskNames = process.argv.slice(2);
  await taskRegistry.runTasks(taskNames);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
