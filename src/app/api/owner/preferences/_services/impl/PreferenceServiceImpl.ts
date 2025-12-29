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

  async getBooleanPreferenceValue(name: string): Promise<boolean> {
    const preference = await this.getPreferenceValue(name);
    if(preference === null) {
      throw new Error("Preference not found");
    }
    return Boolean(preference);
  }

  async getNumberPreferenceValue(name: string): Promise<number> {
    const preference = await this.getPreferenceValue(name);
    if(preference === null) {
      throw new Error("Preference not found");
    }
    return Number(preference);
  }

  async getStringPreferenceValue(name: string): Promise<string> {
    const preference = await this.getPreferenceValue(name);
    if(preference === null) {
      throw new Error("Preference not found");
    }
    return String(preference);
  }

  async getPreferenceValue(name: string): Promise<string | null> {
    const preference = await prisma.appPreferences.findUnique({
      where: {
        name: name,
      },
    });
    return preference?.value ?? null;
  }
}
