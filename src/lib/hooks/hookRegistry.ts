import { CoreHooks } from "@/enums/CoreHooks";
import { DailyClass } from "@/types/classes/DailyClass";

type HookPayloads = {
  [CoreHooks.postFetchAllAvailableClasses]: DailyClass[];
};

type HookName = keyof HookPayloads;

type HookHandler<T> = (payload: T) => T | Promise<T>;

const hooks: {
  [K in HookName]?: HookHandler<HookPayloads[K]>[];
} = {};

export function registerHook<K extends HookName>(
  name: K,
  handler: HookHandler<HookPayloads[K]>
) {
  hooks[name] ??= [];
  hooks[name]!.push(handler);
}

export async function runHooks<K extends HookName>(
  name: K,
  payload: HookPayloads[K]
): Promise<HookPayloads[K]> {
  console.log("Running hooks for", name);
  let result = payload;
  for (const handler of hooks[name] ?? []) {
    result = await handler(result);
  }
  console.log("Hooks result:", result);
  return result;
}
