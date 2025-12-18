import { AppPreferences } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";

interface AppPreferencesContextType {
  preferences: AppPreferences[];
  updatePreference: (name: string, value: string) => void;
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
  const [preferences, setPreferences] = useState<AppPreferences[]>([]);

  const updatePreference = (name: string, value: string) => {
    setPreferences((prev) =>
      prev.map((pref) => (pref.name === name ? { ...pref, value } : pref))
    );
  };

  useEffect(() => {
    const fetchPreferences = async () => {
      const {message, data} = await http.get<ApiResponse<AppPreferences[]>>("/preferences", ApiType.FRONTEND);

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
