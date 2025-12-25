"use client";

import { Accordion } from "@/components/shared/Accordion";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { useEffect, useState } from "react";
import { ReservationsPerClass } from "@/types/reservations/ReservationsPerClass";
import dayjs from "dayjs";
import Container from "@/components/shared/Container";
import { CardSkeleton } from "@/components/shared/CardSkeleton";
import ReservationsAccordionHeader from "./ReservationsAccordionHeader";
import { ReservationRow } from "./ReservationRow";

export default function UserReservations() {
  const [isLoading, setIsLoading] = useState(true);
  const [reservationsPerClass, setReservationsPerClass] = useState<
    ReservationsPerClass[]
  >([]);

  useEffect(() => {
    const fetchReservations = async () => {
      setIsLoading(true);
      try {
        const today = dayjs(new Date())
          .hour(0)
          .minute(0)
          .second(0)
          .millisecond(0);
        const { message, data } = await http.get<
          ApiResponse<ReservationsPerClass[]>
        >(
          `/owner/reservations?targetDate=${today.toISOString()}`,
          ApiType.FRONTEND
        );

        if (message === RequestStatus.SUCCESS) {
          setReservationsPerClass(data!);
          console.log(data);
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
    attended: boolean
  ) => {
    /** @todo: sync to db */
    /*setReservationsPerClass((prev) =>
      prev.map((c) => ({
        ...c,
        reservations: c.reservations.map((r) =>
          r.id === reservationId ? { ...r, attended } : r
        ),
      }))
    );

    await http.patch(
      `/owner/reservations/${reservationId}/attendance`,
      ApiType.FRONTEND,
      { attended },
    );*/
  };

  return (
    <Container>
      <div className="w-full mt-6 overflow-hidden">
        <h2 className="text-xl font-semibold text-white mb-4">
          Users&apos; Reservations
        </h2>
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : reservationsPerClass.length === 0 ? (
            <p className="text-white">No reservations found</p>
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
                    />
                  }
                  className="hover:bg-gray-800"
                >
                  {reservations.length === 0 ? (
                    <p className="text-white">No reservations found</p>
                  ) : (
                    reservations.map((reservation) => (
                      <ReservationRow
                        key={reservation.id}
                        reservation={reservation}
                        onToggleAttendance={handleToggleAttendance}
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
