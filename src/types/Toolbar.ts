import { LucideIcon } from "lucide-react";

type ToolbarItem = {
    icon: LucideIcon,
    onClick: () => void,
    text?: string
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