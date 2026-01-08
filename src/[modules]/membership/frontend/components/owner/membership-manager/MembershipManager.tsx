"use client";

import Container from "@/components/shared/Container";
import { useTranslation } from "react-i18next";
import { MembershipPlan } from "@prisma/client";
import { useState } from "react";
import MembershipManagerCard from "./MembershipManagerCard";
import MembershipAddCard from "./MembershipAddCard";

export default function MembershipManager() {
  const { t } = useTranslation();
  const [plans, setPlans] = useState<MembershipPlan[]>([
    {
      id: 1,
      name: "Basic",
      maxActivities: 1,
      durationDays: 7,
      isActive: true,
    },
  ]);

  return (
    <Container>
      <section className="mt-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">
            {t("membership")}
          </h2>
        </div>

        <div className="rounded-xl p-4 bg-custom-50/80 shadow-lg overflow-y-auto max-h-[65vh]">
          {plans.length === 0 ? (
            <p className="text-custom-300">{t("noMembershipPlansFound")}</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 auto-rows-fr">
              <MembershipAddCard />
              {plans.map((plan) => (
                <MembershipManagerCard key={plan.id} plan={plan} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Container>
  );
}
