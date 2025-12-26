import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth";
import { Roles } from "@/enums/Roles";
import { SessionUser } from "@/types/SessionUser";
import { preferencesStore } from "@/lib/preferences";
import { getStartOfDay } from "@/lib/utils/date";
import dayjs from "dayjs";

export default async function HomePage() {
  const session: SessionUser | null = await readSession();

  if (!session) redirect("/login");

  if(!session.approved) {
    redirect("/approval");
  }

  if (session.role === Roles.USER) {
    await preferencesStore.load();
    const currentDate: string = getStartOfDay(preferencesStore.getByName<string>("timezone"));
    if(session.penalties?.blockedUntil && dayjs(currentDate).isBefore(session.penalties.blockedUntil)) {
      redirect("/penalty");
    }
    redirect("/customer/home");
  }

  if (session.role === Roles.OWNER) {
    redirect("/owner");
  }

  return <p>Loading...</p>;
}
