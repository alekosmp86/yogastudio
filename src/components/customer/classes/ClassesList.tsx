"use client";

import { ApiType } from "@/enums/ApiTypes";
import { http } from "@/lib/http";
import { Activity, useEffect, useState } from "react";
import { DailyClass } from "@/types/classes/DailyClass";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { RequestStatus } from "@/enums/RequestStatus";
import { useToast } from "@/lib/contexts/ToastContext";
import { ToastType } from "@/enums/ToastType";
import { CardSkeleton } from "@/components/shared/CardSkeleton";
import ClassesBrowser from "./ClassesBrowser";
import { useTranslation } from "react-i18next";
import { useConfirmDialog } from "@/lib/hooks/useConfirmDialog";
import { DateUtils } from "@/lib/utils/date";
import { useAppPreferences } from "@/lib/contexts/AppPreferencesContext";

export default function ClassesList() {
  const { t } = useTranslation();
  const [sortedClasses, setSortedClasses] = useState<Map<string, DailyClass[]>>(
    new Map()
  );
  const { getPreferenceByName } = useAppPreferences();
  const { confirm, dialog } = useConfirmDialog();
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const dates = Array.from(sortedClasses.keys());
  const [activeDate, setActiveDate] = useState(dates[0]);

  useEffect(() => {
    const setActiveDateTab = () => {
      if (!dates.length) return;

      setActiveDate((current) => {
        // first load
        if (!current) return dates[0];

        // keep current tab if it still exists
        if (dates.includes(current)) return current;

        // fallback if current tab disappeared
        return dates[0];
      });
    };

    setActiveDateTab();
  }, [dates]);

  useEffect(() => {
    const getClassesList = async () => {
      setLoading(true);
      const { message, data } = await http.get<ApiResponse<DailyClass[]>>(
        "/customer/classes/available",
        ApiType.FRONTEND
      );

      if (message === RequestStatus.SUCCESS) {
        setSortedClasses(() => {
          const newMap = new Map<string, DailyClass[]>();

          data!.forEach((c) => {
            const date = c.date;
            if (!newMap.has(date)) {
              newMap.set(date, []);
            }
            newMap.get(date)!.push(c);
          });

          return newMap;
        });
      }
      setLoading(false);
    };

    getClassesList();
  }, []);

  const handleReserve = async (gymClass: DailyClass) => {
    const { message } = await http.post<ApiResponse<void>>(
      "/customer/reservations",
      ApiType.FRONTEND,
      {
        classId: gymClass.id,
      }
    );

    switch (message) {
      case RequestStatus.SUCCESS:
        setSortedClasses((prev) => {
          const newMap = new Map(prev);
          newMap.set(
            gymClass.date,
            prev
              .get(gymClass.date)!
              .map((c) =>
                c.id === gymClass.id
                  ? { ...c, reserved: c.reserved + 1, available: false }
                  : c
              )
          );
          return newMap;
        });
        toast.showToast({
          type: ToastType.SUCCESS,
          message: "Class reserved successfully.",
          duration: 3000,
        });
        break;
      case RequestStatus.CLASS_ALREADY_RESERVED:
        toast.showToast({
          type: ToastType.INFO,
          message: "You have already reserved this class.",
          duration: 3000,
        });
        break;
      case RequestStatus.CLASS_FULL:
        toast.showToast({
          type: ToastType.ERROR,
          message:
            "This class is full. You have been added to the waiting list.",
          duration: 3000,
        });
        break;
      case RequestStatus.ON_WAITING_LIST:
        toast.showToast({
          type: ToastType.INFO,
          message: "You are on the waiting list.",
          duration: 3000,
        });
        break;
      default:
        toast.showToast({
          type: ToastType.ERROR,
          message: "An error occurred.",
          duration: 3000,
        });
        break;
    }
  };

  const handleCancelation = async (gymClass: DailyClass) => {
    const lateCancelation = await checkForLateCancelation(gymClass);
    const result = await confirm({
      title: t("cancelation"),
      description: lateCancelation
        ? t("lateCancelation")
        : t("classCancelConfirmation"),
      danger: true,
      confirmLabel: t("ok"),
      cancelLabel: t("cancel"),
    });

    if (!result) return;

    const { message } = await http.delete<ApiResponse<void>>(
      `/customer/classes/${gymClass.id}/reservation`,
      ApiType.FRONTEND
    );

    switch (message) {
      case RequestStatus.SUCCESS:
        setSortedClasses((prev) => {
          const newMap = new Map(prev);
          newMap.set(
            gymClass.date,
            prev
              .get(gymClass.date)!
              .map((c) =>
                c.id === gymClass.id
                  ? { ...c, reserved: c.reserved - 1, available: true }
                  : c
              )
          );
          return newMap;
        });
        toast.showToast({
          type: ToastType.SUCCESS,
          message: "Class canceled successfully.",
          duration: 3000,
        });
        break;
      default:
        toast.showToast({
          type: ToastType.ERROR,
          message: "An error occurred.",
          duration: 3000,
        });
        break;
    }
  };

  const checkForLateCancelation = (gymClass: DailyClass) => {
    const lateCancelHours = getPreferenceByName<number>("lateCancelHours");
    if (!lateCancelHours) return false;

    return (
      DateUtils.addHours(DateUtils.getCurrentHour(), lateCancelHours) >=
      gymClass.startTime
    );
  };

  return (
    <>
      <span className="min-w-[320px] max-w-md">{dialog}</span>
      <div className="p-4 flex flex-col gap-4 h-full">
        <h1 className="text-2xl font-bold text-primary-800">
          {t("availableClasses")}
        </h1>

        {/* Scroll area */}
        <div className="overflow-y-auto max-h-[65vh] pr-2">
          {loading ? (
            <div className="flex flex-col gap-4 mb-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <ClassesBrowser
              dates={dates}
              activeDate={activeDate}
              setActiveDate={setActiveDate}
              sortedClasses={sortedClasses}
              handleReserve={handleReserve}
              handleCancelation={handleCancelation}
            />
          )}
        </div>

        {/* When there are NO classes */}
        <Activity
          mode={sortedClasses.size === 0 && !loading ? "visible" : "hidden"}
        >
          <p className="text-primary-800">No classes available for today.</p>
        </Activity>
      </div>
    </>
  );
}
