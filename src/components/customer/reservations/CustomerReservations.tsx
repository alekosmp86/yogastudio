'use client'

import { ApiType } from "@/enums/ApiTypes";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ClassReservation } from "@/types/reservations/ClassReservation";
import { RequestStatus } from "@/enums/RequestStatus";
import { useEffect, useState } from "react";
import ClassCard from "../classes/ClassCard";
import { Card, CardContent } from "@/components/shared/Card";
import { Icon, X } from "lucide-react";
import Button from "@/components/shared/Button";

export default function CustomerReservations() {
  const [reservations, setReservations] = useState<ClassReservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const {message, data} = await http.get<ApiResponse<ClassReservation[]>>("/customer/reservations", ApiType.FRONTEND);
      if (message === RequestStatus.SUCCESS) {
        setReservations(data!);
      }
    };
    fetchReservations();
  }, []);

  const cancelReservation = async (reservationId: number) => {
    const {message} = await http.delete<ApiResponse<void>>(`/customer/reservations/${reservationId}`, ApiType.FRONTEND);
    if (message === RequestStatus.SUCCESS) {
      setReservations((prev) => prev.filter((r) => r.id !== reservationId));
    }
  };

  return (
    <div className='p-4 flex flex-col gap-6 h-full'>
      <h1 className='text-2xl font-bold text-primary-800'>Reservations</h1>
      <p className='text-primary-800'>Here you’ll see your upcoming class reservations.</p>
      <div className="flex flex-col gap-4">
        {reservations.map(({id, class: reservationClass}) => (
          <Card key={id} className='shadow-lg bg-white'>
            <CardContent className='p-4 flex items-center gap-4'>
              <div className='flex flex-col w-full'>
                <div className='flex justify-between'>
                  <h2 className='font-semibold text-primary-800'>{reservationClass.template.title}</h2>
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
                    onClick={() => {cancelReservation(id)}}
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
    </div>
  );
}