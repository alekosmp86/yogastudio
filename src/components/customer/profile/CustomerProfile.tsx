"use client";

import ProfileCard from "./ProfileCard";
import ProfileInsights from "./ProfileInsights";
import { useTranslation } from "react-i18next";

export default function CustomerProfile() {
  const { t } = useTranslation();
  const reservationsCount = 10;
  const upcomingReservations = 5;
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123456789",
    createdAt: new Date().toISOString(),
  };

  const onSaveProfile = (data: { name: string; phone?: string }) => {
    console.log("Profile saved:", data);
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
        reservationsCount={reservationsCount}
        upcomingReservations={upcomingReservations}
      />

      {/* Profile info */}
      <ProfileCard user={user} onSave={onSaveProfile} />
    </div>
  );
}
