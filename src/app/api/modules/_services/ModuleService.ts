import { Modules } from "@prisma/client";

export interface ModuleService {
  getModules(): Promise<Modules[]>;
  getActiveModules(): Promise<Modules[]>;
}
