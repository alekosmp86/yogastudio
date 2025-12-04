import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth";

export default async function HomePage() {
  const session = await readSession();

  if (!session) redirect("/login");

  if (session.role === "CLIENT") {
    redirect("/customer/home");
  }

  if (session.role === "OWNER") {
    redirect("/owner");
  }

  return <p>Loading...</p>;
}
