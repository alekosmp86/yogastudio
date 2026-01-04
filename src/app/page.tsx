import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth";
import { Roles } from "@/enums/Roles";
import { SessionUser } from "@/types/SessionUser";
import { preferencesStore } from "@/lib/preferences";
import { BusinessTime } from "@/lib/utils/date";

export default async function HomePage() {
  await preferencesStore.load();
  const timezone = preferencesStore.getByName<string>("timezone");
  const usersRequireApproval = preferencesStore.getByName<boolean>("usersRequireApproval");
  const businessTime = new BusinessTime(timezone);
  const session: SessionUser | null = await readSession();

  const currentDate = businessTime.now().date;

  if (!session) redirect("/login");

  if (
    session.penalties?.blockedUntil &&
    currentDate < session.penalties.blockedUntil
  ) {
    redirect("/penalty");
  }

  if(usersRequireApproval && !session.approved) {
    redirect("/approval");
  }

  if (session.role === Roles.USER) {
    redirect("/customer/home");
  }

  if (session.role === Roles.OWNER) {
    redirect("/owner");
  }

  return <p>Loading...</p>;
}
