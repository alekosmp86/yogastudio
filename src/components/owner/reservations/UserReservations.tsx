'use client';

import { Accordion } from "@/components/shared/Accordion";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { useEffect, useState } from "react";
import { ReservationsPerClass } from "@/types/reservations/ReservationsPerClass";
import dayjs from "dayjs";

export default function UserReservations() {
    const [reservationsPerClass, setReservationsPerClass] = useState<ReservationsPerClass[]>([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const today = dayjs(new Date()).hour(0).minute(0).second(0).millisecond(0);
                const {message, data} = await http.get<ApiResponse<ReservationsPerClass[]>>(
                    `/owner/reservations?targetDate=${today.toISOString()}`,
                    ApiType.FRONTEND
                );

                if(message === RequestStatus.SUCCESS) {
                    setReservationsPerClass(data!);
                }
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };
        fetchReservations();
    }, []);

    return (
        <div className='w-full mt-4 overflow-hidden'>
            <h2 className='text-xl font-semibold text-white mb-4'>
                Users' Reservations
            </h2>
            <div className='overflow-x-auto max-h-[500px] overflow-y-auto'>
                {reservationsPerClass.map((reservation) => (
                    <Accordion title={reservation.template.title}>
                        {reservation.reservations.map((reservation) => (
                            <p key={reservation.id}>{reservation.user.name}</p>
                        ))}
                    </Accordion>
                ))}
            </div>
        </div>
    );
}