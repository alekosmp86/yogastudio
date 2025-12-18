import { AppPreferences } from "@prisma/client";

export interface PreferenceService {
    getPreferences(): Promise<AppPreferences[]>;
    updatePreferences(preferences: AppPreferences[]): Promise<void>;
}