import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth";
import { Roles } from "@/enums/Roles";
import { SessionUser } from "@/types/SessionUser";

export default async function HomePage() {
  const session: SessionUser | null = await readSession();

  if (!session) redirect("/login");

  if(!session.approved) {
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
