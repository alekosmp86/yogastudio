import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { AppPreference } from "@/types/preferences/AppPreference";

interface AppPreferencesContextType {
  preferences: AppPreference[];
  updatePreference: (id: number, value: string) => void;
}

const AppPreferencesContext = createContext<AppPreferencesContextType>({
  preferences: [],
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

  useEffect(() => {
    const fetchPreferences = async () => {
      const {message, data} = await http.get<ApiResponse<AppPreference[]>>("/owner/preferences", ApiType.FRONTEND);

      if(message === RequestStatus.SUCCESS) {
        setPreferences(data!);
        console.log(data);
      }
    };
    fetchPreferences();
  }, []);

  return (
    <AppPreferencesContext.Provider value={{ preferences, updatePreference }}>
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
