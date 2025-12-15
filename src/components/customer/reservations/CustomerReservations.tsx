"use client";

import { ApiType } from "@/enums/ApiTypes";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ClassReservation } from "@/types/reservations/ClassReservation";
import { RequestStatus } from "@/enums/RequestStatus";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/shared/Card";
import { X } from "lucide-react";
import Button from "@/components/shared/Button";
import dayjs from "dayjs";
import { useToast } from "@/lib/contexts/ToastContext";
import { ToastType } from "@/enums/ToastType";
import { CardSkeleton } from "@/components/shared/CardSkeleton";
import { getTimeXHoursFromNow } from "@/lib/utils/date";
import { APPCONFIG } from "app/config";

export default function CustomerReservations() {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState<ClassReservation[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);

      const date = dayjs().tz(APPCONFIG.TIMEZONE).startOf("day").toISOString();
      const oneHourLaterRounded = getTimeXHoursFromNow(1, APPCONFIG.TIMEZONE).minute(0).second(0).millisecond(0).format("HH:mm");

      const { message, data } = await http.get<ApiResponse<ClassReservation[]>>(
        `/customer/reservations?date=${date}&time=${oneHourLaterRounded}`,
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
    const toastId = toast.showToast({
      type: ToastType.INFO,
      message: "Canceling reservation...",
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

  return (
    <div className='p-4 flex flex-col gap-6 h-full'>
      <h1 className='text-2xl font-bold text-primary-800'>Reservations</h1>
      {loading ? (
        <div className='flex flex-col gap-4'>
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : reservations.length === 0 ? (
        <p className='text-primary-800'>No reservations found.</p>
      ) : (
        <div className='flex flex-col gap-4'>
          {reservations.map(({ id, class: reservationClass }) => (
            <Card key={id} className='shadow-lg bg-white'>
              <CardContent className='p-4 flex items-center gap-4'>
                <div className='flex flex-col w-full'>
                  <div className='flex justify-between'>
                    <h2 className='font-semibold text-primary-800'>
                      {reservationClass.template.title}
                    </h2>
                    <span className='text-sm text-primary-800'>
                      {reservationClass.startTime}
                    </span>
                  </div>
                  <p className='text-sm font-semibold text-primary-800 pb-2'>
                    {reservationClass.template.description}
                  </p>
                  <p className='text-sm text-primary-800'>
                    Instructor: {reservationClass.template.instructor}
                  </p>

                  <div className='flex justify-end'>
                    <Button
                      size='sm'
                      variant='negative'
                      onClick={() => {
                        cancelReservation(id);
                      }}
                    >
                      <X className='mr-2 h-4 w-4' />
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
