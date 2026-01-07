import { CoreHooks } from "@/enums/CoreHooks";
import { DailyClass } from "@/types/classes/DailyClass";
import { User } from "@prisma/client";

type HookPayloads = {
  [CoreHooks.postFetchAllAvailableClasses]: DailyClass[];
  [CoreHooks.postUserCreatedGoogleOauth]: User | null;
};

type HookName = keyof HookPayloads;

type HookHandler<T> = (payload: T) => T | Promise<T>;

class HookRegistry {
  private hooks: {
    [K in HookName]?: HookHandler<HookPayloads[K]>[];
  } = {};

  registerHook<K extends HookName>(
    name: K,
    handler: HookHandler<HookPayloads[K]>
  ) {
    this.hooks[name] ??= [];
    this.hooks[name]!.push(handler);
  }

  async runHooks<K extends HookName>(
    name: K,
    payload: HookPayloads[K]
  ): Promise<HookPayloads[K]> {
    console.log("Running hooks for", name);
    let result = payload;
    for (const handler of this.hooks[name] ?? []) {
      console.log("Running hook:", handler);
      result = await handler(result);
    }
    console.log("Hooks result:", result);
    return result;
  }
}

export const hookRegistry = new HookRegistry();
