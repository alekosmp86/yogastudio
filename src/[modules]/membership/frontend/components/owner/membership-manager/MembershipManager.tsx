"use client";

import Container from "@/components/shared/Container";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import MembershipManagerCard from "./MembershipManagerCard";
import MembershipAddCard from "./MembershipAddCard";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { Membership } from "@/modules/membership/backend/api/models/Membership";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";

export default function MembershipManager() {
  const { t } = useTranslation();
  const [plans, setPlans] = useState<Membership[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const { message, data } = await http.get<ApiResponse<Membership[]>>(
        "/owner/membership/plans",
        ApiType.FRONTEND
      );
      if (message === RequestStatus.SUCCESS && data) {
        setPlans(data);
      }
    };
    fetchPlans();
  }, []);

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
