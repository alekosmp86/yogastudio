import { CoreUiSlots } from "@/modules/[core]/CoreUiSlots";

export type UISlot = CoreUiSlots.OwnerDashboardCards;

type UIComponent<Props = any> = React.ComponentType<Props>;

class UIRegistry {
  private slots: Record<UISlot, UIComponent[]> = {} as any;

  registerUI<Props>(slot: UISlot, component: UIComponent<Props>) {
    this.slots[slot] ??= [];
    this.slots[slot].push(component);
  }

  resolveUI(slot: UISlot): UIComponent[] {
    return this.slots[slot] ?? [];
  }
}

export const uiRegistry = new UIRegistry();
