import { PreferenceService } from "../PreferenceService";
import { AppPreferences } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class PreferenceServiceImpl implements PreferenceService {
    getPreferences(): Promise<AppPreferences[]> {
        return prisma.appPreferences.findMany();
    }
}