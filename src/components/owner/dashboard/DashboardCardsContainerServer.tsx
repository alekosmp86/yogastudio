// OwnerDashboardCards.server.tsx
import { uiRegistry } from "@/lib/hooks/uiRegistry";
import { CoreUiSlots } from "@/modules/[core]/CoreUiSlots";

export function OwnerDashboardCardsContainerServer(props: any) {
  const components = uiRegistry.resolveUI(CoreUiSlots.OwnerDashboardCards);

  return (
    <>
      {components.map((Component, i) => (
        <Component key={i} {...props} />
      ))}
    </>
  );
}
