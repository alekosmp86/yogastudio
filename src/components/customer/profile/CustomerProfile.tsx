"use client";

import { useEffect } from "react";
import ProfileCard from "./ProfileCard";
import ProfileInsights from "./ProfileInsights";
import { useTranslation } from "react-i18next";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ProfileData } from "@/types/profile/ProfileData";
import { ApiType } from "@/enums/ApiTypes";
import { useState } from "react";
import { RequestStatus } from "@/enums/RequestStatus";

export default function CustomerProfile() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const {message, data} = await http.get<ApiResponse<ProfileData>>("/customer/profile", ApiType.FRONTEND);
      if(message === RequestStatus.SUCCESS) {
        setProfile(data!);
      }
    }
    fetchUserProfile();
  }, []);

  const onSaveProfile = async (userBaseInfo: { name: string; email: string; phone?: string }) => {
    const {message} = await http.put<ApiResponse<ProfileData>>("/customer/profile", ApiType.FRONTEND, userBaseInfo);
    if(message === RequestStatus.SUCCESS) {
      setProfile(prevData => ({
        ...prevData!,
        name: userBaseInfo.name,
        email: userBaseInfo.email,
        phone: userBaseInfo.phone ?? prevData!.phone
      }));
    }
  };

  return (
    <div className="flex flex-col h-full px-4 py-5 gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-custom-400">
          {t("myProfile")}
        </h1>
        <p className="text-sm text-custom-200">{t("myProfileDescription")}</p>
      </div>

      {/* Insights */}
      <ProfileInsights
        reservationsCount={profile?.reservations.total || 0}
        upcomingReservations={profile?.reservations.upcoming || 0}
        penalties={profile?.penalties.count || 0}
      />

      {/* Profile info */}
      {profile && <ProfileCard profile={profile} onSave={onSaveProfile} />}
    </div>
  );
}
