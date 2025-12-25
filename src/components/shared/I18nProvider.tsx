"use client";

import { ApiType } from "@/enums/ApiTypes";
import i18n from "@/i18n/i18n";
import { http } from "@/lib/http";
import { AppPreference } from "@/types/preferences/AppPreference";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { RequestStatus } from "@/enums/RequestStatus";
import { useEffect } from "react";

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const fetchPreferences = async () => {
      const {message, data} = await http.get<ApiResponse<AppPreference[]>>("/public/preferences", ApiType.FRONTEND);

      if(message === RequestStatus.SUCCESS && data) {
        const language = data.find((preference: AppPreference) => preference.name === "language")?.value;
        i18n.changeLanguage(language as string);
      }
    }
    fetchPreferences();
  }, []);

  return children;
}