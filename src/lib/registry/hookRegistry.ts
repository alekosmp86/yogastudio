import { CoreHooks } from "@/modules/[core]/CoreHooks";
import { DailyClass } from "@/types/classes/DailyClass";
import { NextClass } from "@/types/classes/NextClass";
import { SessionUser } from "@/types/SessionUser";
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
  [CoreHooks.afterNextClassFetched]: {
    user: SessionUser;
    nextClass: NextClass | null;
  };
};

type HookName = keyof HookPayloads;

type HookPhase = "before" | "after";

type HookHandler<T> = (payload: T) => T | Promise<T>;

const registryId = Math.random().toString(36).substring(7);
console.log(`[HookRegistry] Initialized with ID: ${registryId}`);

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
    console.log(
      `[HookRegistry ${registryId}] Registering hook: ${name} (${phase})`,
    );
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
    console.log(
      `[HookRegistry ${registryId}] Running ${handlers.length} hooks for: ${name} (${phase})`,
    );

    for (const handler of handlers) {
      console.log("Running hook:", name);
      result = await handler(result);
    }

    return result;
  }
}

/* -------------------- Global Singleton -------------------- */

declare global {
  var __hookRegistry: HookRegistry | undefined;
}

export const hookRegistry = globalThis.__hookRegistry || new HookRegistry();

if (process.env.NODE_ENV !== "production") {
  globalThis.__hookRegistry = hookRegistry;
}
