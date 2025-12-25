import { AppPreferences } from "@prisma/client";

export interface PublicPreferenceService {
    getPreferences(): Promise<AppPreferences[]>;
}