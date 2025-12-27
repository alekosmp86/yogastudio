import HomePage from "@/components/customer/homepage/HomePage";
import { readSession } from "@/lib/auth";
import { preferencesStore } from "@/lib/preferences";

export default async function CustomerHomePage() {
  const session = await readSession();
  await preferencesStore.load();

  return (
    <HomePage penaltyCount={session?.penalties?.noShowCount ?? 0} maxAllowedPenalties={preferencesStore.getByName<number>("penaltyMaxNoShowCount")} />
  );
}
