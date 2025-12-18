import { AppPreferences } from "@prisma/client";
import { AppPreference } from "@/types/preferences/AppPreference";

export interface PreferenceMapper {
    toAppPreference(preference: AppPreferences): AppPreference;
    toAppPreferenceArray(preference: AppPreferences[]): AppPreference[];
}