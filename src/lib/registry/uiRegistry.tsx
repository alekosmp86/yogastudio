import { CoreUiSlots } from "@/modules/[core]/CoreUiSlots";

export type UISlotMap = {
  [CoreUiSlots.OwnerDashboardCards]: {
    props: void;
  };
  [CoreUiSlots.OwnerUsersDetails]: {
    props: {
      id: string;
    };
  };
  [CoreUiSlots.CustomerProfileCompletion]: {
    props: {
      userId: number | undefined;
    };
  };
  [CoreUiSlots.CustomerProfile]: {
    props: {
      userId: number | undefined;
    };
  };
};

type NormalizeProps<T> = T extends void ? object : T;

export type UISlot = keyof UISlotMap;
type SlotProps<S extends UISlot> = NormalizeProps<UISlotMap[S]["props"]>;
type UIComponent<S extends UISlot> = React.ComponentType<SlotProps<S>>;

class UIRegistry {
  private slots: {
    [S in UISlot]?: UIComponent<S>[];
  } = {};

  registerUI<S extends UISlot>(slot: S, component: UIComponent<S>) {
    this.slots[slot] ??= [];
    this.slots[slot]!.push(component);
  }

  resolveUI<S extends UISlot>(slot: S): UIComponent<S>[] {
    return this.slots[slot] ?? [];
  }
}

export const uiRegistry = new UIRegistry();
