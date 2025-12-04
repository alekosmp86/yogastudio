import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth";
import { Roles } from "@/enums/Roles";

export default async function HomePage() {
  const session = await readSession();
  console.log(`Session: ${session}`);

  if (!session) redirect("/login");

  if (session.role === Roles.CLIENT) {
    redirect("/customer/home");
  }

  if (session.role === Roles.OWNER) {
    redirect("/owner");
  }

  return <p>Loading...</p>;
}
