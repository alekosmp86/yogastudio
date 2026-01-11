"use client";

import Button from "@/components/shared/Button";
import { SelectionList } from "@/components/shared/SelectionList";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { ToastType } from "@/enums/ToastType";
import { useToast } from "@/lib/contexts/ToastContext";
import { http } from "@/lib/http";
import { Membership } from "@/modules/membership/backend/api/models/Membership";
import { UserActivity } from "@/modules/membership/backend/api/models/UserActivity";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type ActivitiesSelectionFormProps = {
  id: number | undefined;
};

export default function ActivitiesSelectionForm({
  id,
}: ActivitiesSelectionFormProps) {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState<UserActivity | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<number[]>([]);

  useEffect(() => {
    if (!id) return;
    const fetchPlans = async () => {
      const { message, data } = await http.get<ApiResponse<UserActivity>>(
        `/customer/membership/plans/user/${id}/activities`,
        ApiType.FRONTEND
      );

      if (message === RequestStatus.SUCCESS && data) {
        setUserData(data);
        setVisible(data.userActivities?.templates.length === 0);
      }
    };
    fetchPlans();
  }, [id]);

  if (!id) return null;

  const handleSave = async () => {
    const { message } = await http.post<ApiResponse<void>>(
      `/customer/membership/plans/user/${id}/activities`,
      ApiType.FRONTEND,
      { activitiesIds: selectedActivities }
    );

    if (message === RequestStatus.SUCCESS) {
      showToast({
        type: ToastType.SUCCESS,
        message: "Activities saved successfully",
        duration: 3000,
      });
      setVisible(false);
    } else {
      showToast({
        type: ToastType.ERROR,
        message: "Activities save failed",
        duration: 3000,
      });
    }
  };

  return (
    <>
      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60" aria-hidden />

          {/* Modal */}
          <div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
          >
            <h2 className="mb-1 text-xl font-semibold text-primary-800">
              {t("selectYourActivities")}
            </h2>

            <p className="mb-4 text-sm text-primary-600">
              {t("needInformationToManageReservations")}
            </p>

            <SelectionList
              items={
                userData?.activities?.map((activity) => ({
                  id: activity.id,
                  name: activity.title,
                })) || []
              }
              selectedIds={selectedActivities}
              maxSelectable={
                userData?.userActivities?.membershipPlan.maxActivities || 1
              }
              onChange={setSelectedActivities}
            />

            <div className="flex justify-end pt-4">
              <Button variant="primary" onClick={handleSave}>
                {t("save")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
