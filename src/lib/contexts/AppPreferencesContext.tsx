'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { AppPreference } from "@/types/preferences/AppPreference";
import { PreferenceTypes } from "@/enums/PreferenceTypes";

interface AppPreferencesContextType {
  preferences: AppPreference[];
  getPreferenceByName: <T = unknown>(name: string) => T | undefined;
  updatePreference: (id: number, value: string) => void;
}

const AppPreferencesContext = createContext<AppPreferencesContextType>({
  preferences: [],
  getPreferenceByName: () => undefined,
  updatePreference: () => {},
});

export const AppPreferencesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [preferences, setPreferences] = useState<AppPreference[]>([]);

  const updatePreference = (id: number, value: string) => {
    setPreferences((prev) =>
      prev.map((pref) => (pref.id === id ? { ...pref, value } : pref))
    );
  };

  const getPreferenceByName = <T = unknown>(name: string): T | undefined => {
    return preferences.find((pref) => pref.name === name)?.value as T;
  };

  const parseValue = (value: string, type: PreferenceTypes) => {
    switch (type) {
      case PreferenceTypes.BOOLEAN:
        return value === "true";
      case PreferenceTypes.NUMBER:
        return Number(value);
      default:
        return value;
    }
  };

  useEffect(() => {
    const fetchPreferences = async () => {
      const {message, data} = await http.get<ApiResponse<AppPreference[]>>("/owner/preferences", ApiType.FRONTEND);

      if(message === RequestStatus.SUCCESS) {
        setPreferences(data!.map(pref => ({ ...pref, value: parseValue(pref.value as string, pref.type)})));
      }
    };
    fetchPreferences();
  }, []);

  return (
    <AppPreferencesContext.Provider value={{ preferences, getPreferenceByName, updatePreference }}>
      {children}
    </AppPreferencesContext.Provider>
  );
};

export const useAppPreferences = () => {
  const ctx = useContext(AppPreferencesContext);
  if (!ctx)
    throw new Error(
      "useAppPreferences must be used inside a AppPreferencesProvider"
    );
  return ctx;
};
