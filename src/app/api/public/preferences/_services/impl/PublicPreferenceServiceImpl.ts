import { PublicPreferenceService } from "../PublicPreferenceService";
import { prisma } from "@/lib/prisma";
import { AppPreferences } from "@prisma/client";

export class PublicPreferenceServiceImpl implements PublicPreferenceService {
  private readonly publicPreferences = ["language"];

  getPreferences(): Promise<AppPreferences[]> {
    return prisma.appPreferences.findMany({
      where: {
        name: {
          in: this.publicPreferences,
        },
      },
    });
  }
}
