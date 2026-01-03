"use client";

import { useTranslation } from "react-i18next";
import { UserActions as UserActionsEnum } from "@/enums/UserActions";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { RequestStatus } from "@/enums/RequestStatus";
import { useToast } from "@/lib/contexts/ToastContext";
import { useCallback, useEffect, useState } from "react";
import { ApiType } from "@/enums/ApiTypes";
import { ToastType } from "@/enums/ToastType";
import { UserDetail } from "@/types/users/UserDetail";
import CancelledClassesSection from "./CancelledClassesSection";
import { useAppPreferences } from "@/lib/contexts/AppPreferencesContext";

type UserOverviewCardProps = {
  id: string;
};

export default function UserDetails({ id }: UserOverviewCardProps) {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [user, setUser] = useState<UserDetail | null>(null);
  const { getPreferenceByName } = useAppPreferences();
  const maxPenaltiesAllowed = getPreferenceByName<number>("maxPenaltiesCount");

  const fetchUserDetails = useCallback(async () => {
    const { message, data } = await http.get<ApiResponse<UserDetail>>(
      `/owner/users/${id}/${UserActionsEnum.VIEW_USER_DETAILS}`,
      ApiType.FRONTEND
    );

    if (message !== RequestStatus.SUCCESS) {
      showToast({
        message: t("failedToFetchUser"),
        type: ToastType.ERROR,
      });
      return;
    }

    setUser(data!);
  }, [id, showToast, t]);

  useEffect(() => {
    const getUserDetails = async () => {
      await fetchUserDetails();
    };
    getUserDetails();
  }, [fetchUserDetails]);

  return (
    <>
      <section className="mt-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">
            {t("userDetails")}
          </h2>
        </div>
      </section>

      <div className="rounded-2xl bg-custom-50 p-5 mt-6 shadow-sm space-y-4">
        <div className="flex items-center gap-4">
          {/* Avatar placeholder */}
          <div className="h-12 w-12 rounded-full bg-custom-100 flex items-center justify-center text-custom-400 font-semibold">
            {user?.basicInfo.name.charAt(0)}
          </div>

          <div className="min-w-0">
            <div className="text-base font-semibold text-custom-400 truncate">
              {user?.basicInfo.name}
            </div>
            <div className="text-xs text-custom-200 truncate">
              {user?.basicInfo.email}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-xl bg-white/60 p-4 text-sm text-custom-400 space-y-1">
          <div>
            <span className="opacity-60">{t("phone")}</span>
            <div className="font-medium">{user?.basicInfo.phone}</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label={t("cancelations")}
            value={user?.activityStats.cancelations ?? 0}
          />
          <StatCard
            label={t("penalties")}
            value={`${user?.activityStats.penalties ?? 0}/${maxPenaltiesAllowed}`}
          />
        </div>

        <CancelledClassesSection
          cancelledClasses={user?.cancelledClasses ?? []}
        />

        {/* Future expansion hint */}
        <div className="text-xs text-custom-200 italic">
          {t("moreActivityInsightsComingSoon")}
        </div>
      </div>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl bg-white p-3 text-center shadow-xs">
      <div className="text-lg font-semibold text-custom-400">{value}</div>
      <div className="text-xs text-custom-200">{label}</div>
    </div>
  );
}
