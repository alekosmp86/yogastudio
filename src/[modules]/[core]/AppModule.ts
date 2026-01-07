import { ComponentType } from "react";

export type ModulePage = {
  path: string[]; // e.g. ["membership"]
  component: ComponentType<any>;
};

export interface AppModule {
  name: string;
  initCore?: () => void; // hooks, services, domain logic
  initUI?: () => void; // UI registrations
  initTasks?: () => void; // CLI / deploy tasks
  pages?: ModulePage[];
}
