import { readSession } from "@/lib/auth";
import { DailyClass } from "@/types/classes/DailyClass";
import { userActivityService } from "../api";

export async function fetchClassesByMembershipPostHook(payload: DailyClass[]) {
  const user = await readSession();
  if (!user) return payload;

  const activityData = await userActivityService.getAllUserActivities(user.id);
  if (!activityData) return payload;

  const templates = activityData.userActivities?.templates;
  if (!templates) return payload;

  const newPayload = payload.filter((p) => {
    return templates.some((t) => t.templateId === p.activity.id);
  });

  return newPayload;
}
