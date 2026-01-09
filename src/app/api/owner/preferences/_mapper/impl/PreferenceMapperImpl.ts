import { AppPreferences } from "@prisma/client";
import { PreferenceMapper } from "../PreferenceMapper";
import { AppPreference } from "@/types/preferences/AppPreference";
import { PreferenceTypes } from "@/enums/PreferenceTypes";
import { PreferenceCategory } from "@/enums/PreferenceCategory";

export class PreferenceMapperImpl implements PreferenceMapper {
  toAppPreference(preference: AppPreferences): AppPreference {
    return {
      id: preference.id,
      name: preference.name,
      label: preference.label,
      type: preference.type as PreferenceTypes,
      value: preference.value,
      options: preference.options ? JSON.parse(preference.options) : [],
      category: preference.category as PreferenceCategory,
      moduleId: preference.moduleId,
    };
  }

  toAppPreferenceArray(preference: AppPreferences[]): AppPreference[] {
    return preference.map((pref) => this.toAppPreference(pref));
  }

  toPrismaPreference(preference: AppPreference): AppPreferences {
    return {
      id: preference.id,
      name: preference.name,
      label: preference.label,
      type: preference.type,
      value: preference.value.toString(),
      options: preference.options ? JSON.stringify(preference.options) : "",
      category: preference.category,
      moduleId: preference.moduleId,
    };
  }
}
