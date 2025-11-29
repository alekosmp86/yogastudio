import { LucideIcon } from "lucide-react";

type ToolbarItem = {
    icon: LucideIcon,
    onClick: () => void
};

export type Toolbar = {
    items: ToolbarItem[],
    searchInput: {
        active: boolean,
        placeholder: string,
        value: string,
        onChange: (value: string) => void
    }
};