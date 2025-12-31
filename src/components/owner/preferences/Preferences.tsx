"use client";

import Container from "@/components/shared/Container";
import TableToolbar from "@/components/shared/TableToolbar";
import { useAppPreferences } from "@/lib/contexts/AppPreferencesContext";
import { Toolbar } from "@/types/Toolbar";
import { useState } from "react";
import PreferencesTable from "./PreferencesTable";
import { SaveIcon } from "lucide-react";
import { http } from "@/lib/http";
import { ApiType } from "@/enums/ApiTypes";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { AppPreference } from "@/types/preferences/AppPreference";
import { RequestStatus } from "@/enums/RequestStatus";
import { useToast } from "@/lib/contexts/ToastContext";
import { ToastType } from "@/enums/ToastType";
import { useTranslation } from "react-i18next";

export default function Preferences() {
  const { preferences, updatePreference } = useAppPreferences();
  const toast = useToast();
  const [changedPreferences, setChangedPreferences] = useState<AppPreference[]>(
    []
  );
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  const filteredPreferences = preferences.filter((p) =>
    p.label.toLowerCase().includes(search.toLowerCase())
  );

  const toolbar: Toolbar = {
    items: [
      {
        icon: SaveIcon,
        text: "Save",
        onClick: async () => {
          await handleSave();
        },
      },
    ],
    searchInput: {
      active: true,
      placeholder: "Search preferences...",
      value: search,
      onChange: setSearch,
    },
  };

  const handlePreferenceChange = (preference: AppPreference) => {
    setChangedPreferences((prev) => {
      const index = prev.findIndex((p) => p.id === preference.id);
      if (index === -1) {
        return [...prev, preference];
      }
      return [...prev.slice(0, index), preference, ...prev.slice(index + 1)];
    });
    updatePreference(preference.id, preference.value as string);
  };

  const handleSave = async () => {
    const toastId = toast.showToast({
      message: "Saving preferences...",
      type: ToastType.INFO,
      persistent: true,
    });

    const { message } = await http.post<ApiResponse<void>>(
      "/owner/preferences",
      ApiType.FRONTEND,
      changedPreferences.map((pref) => ({
        ...pref,
        value: pref.value as string,
      }))
    );
    if (message === RequestStatus.SUCCESS) {
      toast.hideToast(toastId);
      toast.showToast({
        message: "Preferences saved successfully.",
        type: ToastType.SUCCESS,
      });

      setChangedPreferences([]);
    } else {
      toast.hideToast(toastId);
      toast.showToast({
        message: "Failed to save preferences.",
        type: ToastType.ERROR,
      });
    }
  };

  return (
    <Container>
      <div className='w-full mt-6 overflow-hidden'>
        <h2 className='text-xl font-semibold text-white mb-4'>
          {t("preferences")}
        </h2>

        <span>
          <TableToolbar
            toolbar={toolbar}
            search={search}
            setSearch={setSearch}
          />
          <PreferencesTable
            preferences={filteredPreferences}
            onChange={handlePreferenceChange}
          />
        </span>
      </div>
    </Container>
  );
}
