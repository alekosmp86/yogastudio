import { AppPreferences } from "@prisma/client";

export interface PreferenceService {
    getPreferences(): Promise<AppPreferences[]>;
}