"use client";

import { useAppPreferences } from "@/lib/contexts/AppPreferencesContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { SessionUser } from "@/types/SessionUser";
import { readSession } from "@/lib/auth";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function HeroSection() {
  const { t } = useTranslation();
  const { getPreferenceByName } = useAppPreferences();
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      const user = await readSession();
      if (!user) {
        redirect("/login");
      }
      setUser(user);
    };
    getUserData();
  }, []);

  return (
    <section className="text-center px-4 pt-6">
      <h1 className="text-3xl font-semibold text-primary-900 leading-tight">
        {t("hiUser", { user: user?.name })}
      </h1>

      <p className="mt-2 text-primary-600 text-base">
        {t("welcomeTo")}{" "}
        <span className="font-medium">
          {getPreferenceByName<string>("businessName")}
        </span>
      </p>

      <p className="mt-4 text-sm text-primary-500 max-w-md mx-auto">
        {t("homePageIntro")}
      </p>
    </section>
  );
}
