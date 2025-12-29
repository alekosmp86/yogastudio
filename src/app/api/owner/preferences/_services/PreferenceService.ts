import { AppPreferences } from "@prisma/client";

export interface PreferenceService {
    getPreferences(): Promise<AppPreferences[]>;
    updatePreferences(preferences: AppPreferences[]): Promise<void>;
    getStringPreferenceValue(name: string): Promise<string>;
    getBooleanPreferenceValue(name: string): Promise<boolean>;
    getNumberPreferenceValue(name: string): Promise<number>;
}