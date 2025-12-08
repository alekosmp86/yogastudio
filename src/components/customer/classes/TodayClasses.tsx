'use client';

import { ApiType } from "@/enums/ApiTypes";
import { http } from "@/lib/http";
import { ScheduledClassExtended } from "@/types/schedule/ScheduledClassExtended";
import { useEffect, useState } from "react";
import ClassCard from "./ClassCard";

export default function TodayClasses() {
  const [upcomingClasses, setUpcomingClasses] = useState<ScheduledClassExtended[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTodayClasses = async () => {
      setLoading(true);
      const {data}: {data: ScheduledClassExtended[]} = await http.get("/customer/classes/today", ApiType.FRONTEND);
      data.sort((a, b) => a.schedule[0].startTime.localeCompare(b.schedule[0].startTime));
      setUpcomingClasses(data);
      setLoading(false);
    };

    getTodayClasses();
  }, []);

  return (
    <div className='p-4 flex flex-col gap-6'>
      <h1 className='text-2xl font-bold text-primary-800'>Today’s Classes</h1>

      {loading && (
        <p className='text-primary-800'>Loading classes...</p>
      )}

      {upcomingClasses.length === 0 && !loading && (
        <p className='text-primary-800'>No classes scheduled for today.</p>
      )}

      <div className='flex flex-col gap-4'>
        {upcomingClasses.map((gymClass) => {
          return gymClass.schedule.map((schedule) => {
            return <ClassCard key={schedule.id} gymClass={gymClass} schedule={schedule} />
          })
        })}
      </div>
    </div>
  );
}
