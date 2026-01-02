import { PreferenceTypes } from "@/enums/PreferenceTypes";
import { PreferenceCategory } from "@/enums/PreferenceCategory";

export type AppPreference = {
    id: number;
    name: string;
    label: string;
    type: PreferenceTypes;
    value: string | number | boolean;
    options?: { value: string; label: string }[];
    category: PreferenceCategory;
};