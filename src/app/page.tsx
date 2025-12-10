import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth";
import { Roles } from "@/enums/Roles";

export default async function HomePage() {
  const session = await readSession();
  console.log(`Session: ${session?.role}`);

  if (!session) redirect("/login");

  if (session.role === Roles.USER) {
    redirect("/customer/home");
  }

  if (session.role === Roles.OWNER) {
    redirect("/owner");
  }

  return <p>Loading...</p>;
}
