import { CoreHooks } from "@/modules/[core]/CoreHooks";
import { DailyClass } from "@/types/classes/DailyClass";
import {
  ClassInstance,
  ClassTemplate,
  Reservation,
  User,
} from "@prisma/client";
import { GoogleUserInfo } from "app/api/auth/providers/google/_dto/GoogleUserInfo";

/* -------------------- Types -------------------- */

type HookPayloads = {
  [CoreHooks.beforeFetchAllAvailableClasses]: null;
  [CoreHooks.afterFetchAllAvailableClasses]: DailyClass[];
  [CoreHooks.beforeUserCreated]: GoogleUserInfo;
  [CoreHooks.afterUserCreated]: User;
  [CoreHooks.beforeSessionCreated]: User;
  [CoreHooks.afterReservationCancelled]: Reservation & {
    class: ClassInstance & { template: ClassTemplate };
  };
  [CoreHooks.afterAttendanceUpdated]: { userId: number; attended: boolean };
};

type HookName = keyof HookPayloads;

type HookPhase = "before" | "after";

type HookHandler<T> = (payload: T) => T | Promise<T>;

/* -------------------- Registry -------------------- */

class HookRegistry {
  private hooks: {
    [K in HookName]?: {
      before: HookHandler<HookPayloads[K]>[];
      after: HookHandler<HookPayloads[K]>[];
    };
  } = {};

  registerHook<K extends HookName>(
    name: K,
    phase: HookPhase,
    handler: HookHandler<HookPayloads[K]>
  ) {
    this.hooks[name] ??= { before: [], after: [] };
    this.hooks[name]![phase].push(handler);
  }

  async runHooks<K extends HookName>(
    name: K,
    phase: HookPhase,
    payload: HookPayloads[K]
  ): Promise<HookPayloads[K]> {
    let result = payload;

    const handlers = this.hooks[name]?.[phase] ?? [];

    for (const handler of handlers) {
      console.log("Running hook:", name);
      result = await handler(result);
    }

    return result;
  }
}

export const hookRegistry = new HookRegistry();
