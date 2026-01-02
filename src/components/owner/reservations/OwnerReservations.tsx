"use client";

import { Accordion } from "@/components/shared/Accordion";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { useEffect, useState } from "react";
import { ReservationsPerClass } from "@/types/reservations/ReservationsPerClass";
import Container from "@/components/shared/Container";
import { CardSkeleton } from "@/components/shared/CardSkeleton";
import ReservationsAccordionHeader from "./ReservationsAccordionHeader";
import { ReservationRow } from "./ReservationRow";
import { useTranslation } from "react-i18next";
import { useAppPreferences } from "@/lib/contexts/AppPreferencesContext";
import { BusinessTime } from "@/lib/utils/date";

export default function OwnerReservations() {
  const { t } = useTranslation();
  const { getPreferenceByName } = useAppPreferences();
  const language = getPreferenceByName<string>("language")!;
  const businessTime = new BusinessTime(getPreferenceByName("timezone")!);
  const [isLoading, setIsLoading] = useState(true);
  const [reservationsPerClass, setReservationsPerClass] = useState<
    ReservationsPerClass[]
  >([]);
  const attendances = reservationsPerClass.map((c) => c.reservations).flat();

  useEffect(() => {
    const fetchReservations = async () => {
      setIsLoading(true);
      try {
        const { message, data } = await http.get<
          ApiResponse<ReservationsPerClass[]>
        >(`/owner/reservations`, ApiType.FRONTEND);

        if (message === RequestStatus.SUCCESS) {
          setReservationsPerClass(data!);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const handleToggleAttendance = async (
    reservationId: number,
    userId: number,
    attended: boolean
  ) => {
    const reservation = attendances.find(
      (r) => r.id === reservationId && r.user.id === userId
    );
    if (reservation && reservation.attended === attended) {
      return;
    }

    const { message } = await http.patch<ApiResponse<void>>(
      `/owner/reservations/${reservationId}/attendance`,
      ApiType.FRONTEND,
      { attended, userId }
    );

    if (message === RequestStatus.SUCCESS) {
      setReservationsPerClass((prev) =>
        prev.map((c) => ({
          ...c,
          reservations: c.reservations.map((r) =>
            r.id === reservationId ? { ...r, attended } : r
          ),
        }))
      );
    }
  };

  return (
    <Container>
      <div className="w-full mt-6 overflow-hidden">
        <h2 className="text-xl font-semibold text-white mb-4">
          {t("reservations")} ({businessTime.formatDate(businessTime.now().date, language)})
        </h2>
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : reservationsPerClass.length === 0 ? (
            <p className="text-white">{t("noReservationsFound")}</p>
          ) : (
            reservationsPerClass.map(
              ({ id, startTime, reservations, template }) => (
                <Accordion
                  key={id}
                  header={
                    <ReservationsAccordionHeader
                      title={`${template.title} - ${startTime}`}
                      booked={reservations.length}
                      capacity={template.capacity}
                      attendance={reservations.reduce(
                        (acc, r) => acc + (r.attended ? 1 : 0),
                        0
                      )}
                    />
                  }
                >
                  {reservations.length === 0 ? (
                    <p className="text-custom-400">{t("noReservationsFound")}</p>
                  ) : (
                    reservations.map((reservation) => (
                      <ReservationRow
                        key={reservation.id}
                        reservation={reservation}
                        onToggleAttendance={(attended: boolean) =>
                          handleToggleAttendance(
                            reservation.id,
                            reservation.user.id,
                            attended
                          )
                        }
                      />
                    ))
                  )}
                </Accordion>
              )
            )
          )}
        </div>
      </div>
    </Container>
  );
}
