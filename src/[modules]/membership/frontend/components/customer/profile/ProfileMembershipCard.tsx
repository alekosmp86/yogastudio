"use client";

import { useTranslation } from "react-i18next";
import { Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { http } from "@/lib/http";
import { RequestStatus } from "@/enums/RequestStatus";
import { ApiType } from "@/enums/ApiTypes";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { MembershipDetails } from "@/modules/membership/backend/api/models/MembershipDetails";

type ClientMembershipCardProps = {
  userId: number | undefined;
};

export default function ProfileMembershipCard({
  userId,
}: ClientMembershipCardProps) {
  const { t } = useTranslation();
  const [membershipDetails, setMembershipDetails] =
    useState<MembershipDetails | null>(null);

  useEffect(() => {
    const fetchMembershipDetails = async () => {
      const { message, data } = await http.get<ApiResponse<MembershipDetails>>(
        `/customer/membership/plans/user/${userId}/details`,
        ApiType.FRONTEND,
      );

      if (message === RequestStatus.SUCCESS && data) {
        setMembershipDetails(data);
      }
    };
    fetchMembershipDetails();
  }, [userId]);

  return (
    <>
      {userId ? (
        <div className="rounded-md border border-gray-200 bg-transparent p-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1.2fr] gap-6">
            {/* LEFT — Membership data */}
            <div className="flex flex-col gap-2">
              {/* Header */}
              <div>
                <h2 className="text-lg font-semibold text-custom-300">
                  {membershipDetails?.membershipPlan.name}
                </h2>

                <div className="mt-1 flex items-center gap-2 text-sm">
                  {true ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">Active</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span className="text-red-600">Expired</span>
                    </>
                  )}
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{t("validUntil")}</span>
                <span className="font-medium text-custom-300">
                  {membershipDetails?.endDate}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block bg-gray-200" />

            {/* RIGHT — Activities */}
            <div>
              <h2 className="text-lg font-semibold text-custom-300">
                {t("yourActivities")}
              </h2>

              <div className="flex flex-wrap gap-3 mt-2 mb-2">
                {membershipDetails?.activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm shadow-sm text-custom-300 font-semibold"
                  >
                    {activity.title}
                  </div>
                ))}
              </div>

              <span className="text-xs text-custom-200">
                ** {t("membershipCardActivitiesNote")}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
