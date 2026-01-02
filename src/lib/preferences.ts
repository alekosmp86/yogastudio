// src/lib/preferences/PreferencesStore.ts
import "server-only";
import { prisma } from "@/lib/prisma";
import { PreferenceTypes } from "@/enums/PreferenceTypes";
import { AppPreference } from "@/types/preferences/AppPreference";
import { PreferenceCategory } from "@/enums/PreferenceCategory";

class PreferencesStore {
  private static instance: PreferencesStore;
  private preferences: AppPreference[] | null = null;
  private loadingPromise: Promise<void> | null = null;

  private constructor() {}

  static getInstance() {
    if (!PreferencesStore.instance) {
      PreferencesStore.instance = new PreferencesStore();
    }
    return PreferencesStore.instance;
  }

  async load(force = false) {
    if (this.preferences && !force) return;

    if (!this.loadingPromise) {
      this.loadingPromise = this.fetchAndParse().finally(() => {
        this.loadingPromise = null;
      });
    }

    await this.loadingPromise;
  }

  private async fetchAndParse() {
    const raw = await prisma.appPreferences.findMany();

    this.preferences = raw.map((p) => ({
      ...p,
      type: p.type as PreferenceTypes,
      value: this.parseValue(p.value, p.type as PreferenceTypes),
      options: p.options ? JSON.parse(p.options) : [],
      category: p.category as PreferenceCategory,
    }));
  }

  getAll() {
    if (!this.preferences) {
      throw new Error("Preferences not loaded");
    }
    return this.preferences;
  }

  getByName<T = unknown>(name: string): T {
    const pref = this.preferences?.find((p) => p.name === name);
    if (!pref) throw new Error(`Preference ${name} not found`);
    return pref.value as T;
  }

  async refresh() {
    await this.load(true);
  }

  private parseValue(value: string, type: PreferenceTypes) {
    switch (type) {
      case PreferenceTypes.TEXT:
        return value;
      case PreferenceTypes.NUMBER:
        return Number(value);
      case PreferenceTypes.BOOLEAN:
        return value === "true";
      default:
        return value;
    }
  }
}

export const preferencesStore = PreferencesStore.getInstance();
