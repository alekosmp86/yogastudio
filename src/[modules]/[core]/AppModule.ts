export interface AppModule {
  name: string;
  initCore?: () => void; // hooks, services, domain logic
  initUI?: () => void; // UI registrations
  initRoutes?: () => void; // Route registrations
  initTasks?: () => void; // CLI / deploy tasks
}
