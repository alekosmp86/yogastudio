import { PreferenceService } from "../PreferenceService";
import { AppPreferences } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class PreferenceServiceImpl implements PreferenceService {
  getPreferences(): Promise<AppPreferences[]> {
    return prisma.appPreferences.findMany();
  }

  async updatePreferences(preferences: AppPreferences[]): Promise<void> {
    const queries = preferences.map((preference) => {
      return prisma.appPreferences.update({
        where: {
          id: preference.id,
        },
        data: preference,
      });
    });
    await prisma.$transaction(queries);
  }
}
