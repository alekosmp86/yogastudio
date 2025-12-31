"use client";

import { ApiType } from "@/enums/ApiTypes";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ClassReservation } from "@/types/reservations/ClassReservation";
import { RequestStatus } from "@/enums/RequestStatus";
import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/lib/contexts/ToastContext";
import { ToastType } from "@/enums/ToastType";
import { CardSkeleton } from "@/components/shared/CardSkeleton";
import ReservationsByDate from "./ReservationsByDate";
import { useTranslation } from "react-i18next";
import { useConfirmDialog } from "@/lib/hooks/useConfirmDialog";
import { useAppPreferences } from "@/lib/contexts/AppPreferencesContext";
import { BusinessTime } from "@/lib/utils/date";

export default function CustomerReservations() {
  const { t } = useTranslation();
  const {getPreferenceByName} = useAppPreferences();
  const businessTime = new BusinessTime(getPreferenceByName<string>("timezone") || "UTC");
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState<ClassReservation[]>([]);
  const toast = useToast();
  const { confirm, dialog } = useConfirmDialog();

  const grouped = useMemo(() => {
    const map = new Map<string, ClassReservation[]>();
    reservations.forEach((r) => {
      const date = r.class.date.toString();
      if (!map.has(date)) map.set(date, []);
      map.get(date)!.push(r);
    });
    return map;
  }, [reservations]);

  const dates = Array.from(grouped.keys());

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);

      const { message, data } = await http.get<ApiResponse<ClassReservation[]>>(
        `/customer/reservations`,
        ApiType.FRONTEND
      );

      if (message === RequestStatus.SUCCESS) {
        setReservations(data!);
      }

      setLoading(false);
    };

    fetchReservations();
  }, []);

  const cancelReservation = async (reservationId: number) => {
    const lateCancelation = checkForLateCancelation(reservationId);
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

    const toastId = toast.showToast({
      type: ToastType.INFO,
      message: t("cancelingReservation"),
      persistent: true,
    });

    const { message } = await http.delete<ApiResponse<void>>(
      `/customer/reservations/${reservationId}`,
      ApiType.FRONTEND
    );

    if (message === RequestStatus.SUCCESS) {
      setReservations((prev) => prev.filter((r) => r.id !== reservationId));
    }

    toast.hideToast(toastId);
  };

  const checkForLateCancelation = (reservationId: number) => {
    const lateCancelHours = getPreferenceByName<number>("lateCancelHours");
    if (!lateCancelHours) return false;

    const reservation = reservations.find((r) => r.id === reservationId);
    if (!reservation) return false;

    return businessTime.addHours(lateCancelHours) >= reservation.class.startTime;
  };

  return (
    <>
      {dialog}
      <div className='p-4 flex flex-col gap-6 h-full'>
        <h1 className='text-2xl font-bold text-primary-800'>
          {t("reservations")}
        </h1>

        {loading ? (
          <div className='flex flex-col gap-4'>
            {Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : reservations.length === 0 ? (
          <p className='text-primary-800'>{t("noReservationsFound")}</p>
        ) : (
          <div className='flex flex-col gap-8 overflow-y-auto max-h-[65vh]'>
            {dates.map((date) => (
              <ReservationsByDate
                key={date}
                date={date}
                reservations={grouped.get(date)!}
                onCancel={cancelReservation}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
