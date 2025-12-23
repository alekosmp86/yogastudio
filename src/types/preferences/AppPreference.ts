import { PreferenceTypes } from "@/enums/PreferenceTypes";

export type AppPreference = {
    id: number;
    name: string;
    label: string;
    type: PreferenceTypes;
    value: string | number | boolean;
};