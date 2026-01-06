import { registerHook } from "@/lib/hooks/hookRegistry";
import { CoreHooks } from "@/enums/CoreHooks";
import { AppModule } from "AppModule";
import { fetchClassesByMembershipPostHook } from "./backend/hooks/FetchClassesByMembershipPostHook";

export const MembershipModule: AppModule = {
  init() {
    registerHook(CoreHooks.postFetchAllAvailableClasses, fetchClassesByMembershipPostHook);
  },
};
