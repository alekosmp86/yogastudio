"use client";

import QuickActionCard from "./QuickActionCard";
import Testimonials from "./Testimonials";
import { Calendar, BookOpenCheck, User2 } from "lucide-react";
import { useAppPreferences } from "@/lib/contexts/AppPreferencesContext";
import { useToast } from "@/lib/contexts/ToastContext";
import { ToastType } from "@/enums/ToastType";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { redirect } from "next/navigation";
import { SessionUser } from "@/types/SessionUser";
import { readSession } from "@/lib/auth";
import HeroSection from "./HeroSection";
import NextClassSection from "./NextClassSection";

type HomePageProps = {
  penaltyCount: number;
  maxAllowedPenalties: number;
};

export default function HomePage({
  penaltyCount,
  maxAllowedPenalties,
}: HomePageProps) {
  const { t } = useTranslation();
  const { getPreferenceByName } = useAppPreferences();
  const { showToast } = useToast();
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

  const showPenaltiesToast = useCallback(() => {
    if (penaltyCount > 0 && penaltyCount < maxAllowedPenalties) {
      showToast({
        message: t("penalties", {
          count: penaltyCount,
          max: maxAllowedPenalties,
        }),
        type: ToastType.WARNING,
        persistent: true,
      });
    }
  }, [penaltyCount, maxAllowedPenalties, showToast, t]);

  useEffect(() => {
    const penalties = () => {
      showPenaltiesToast();
    };
    penalties();
  }, [showPenaltiesToast]);

  return (
    <div className="space-y-6 pb-6">
      {/* HERO */}
      <HeroSection />

      {/* PRIMARY CTA – NEXT CLASS */}
      <NextClassSection />

      {/* QUICK ACTIONS */}
      <section className="px-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <QuickActionCard
            icon={Calendar}
            label={t("classes")}
            href="/customer/classes"
          />
          <QuickActionCard
            icon={BookOpenCheck}
            label={t("reservations")}
            href="/customer/reservations"
          />
          <QuickActionCard
            icon={User2}
            label={t("profile")}
            href="/customer/profile"
          />
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="px-4">
        <Testimonials />
      </section>
    </div>
  );
}
