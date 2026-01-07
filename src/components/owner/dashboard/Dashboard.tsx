import { uiRegistry } from "@/lib/hooks";
import { CoreUiSlots } from "@/modules/[core]/CoreUiSlots";
import { OwnerDashboardClient } from "./DashboardClient";
import { OwnerDashboardCardsContainerServer } from "./DashboardCardsContainerServer";

export default function Dashboard() {
  const components = uiRegistry.resolveUI(CoreUiSlots.OwnerDashboardCards);
  console.log(components);

  return (
    <OwnerDashboardClient>
      <OwnerDashboardCardsContainerServer />
    </OwnerDashboardClient>
  );
}
