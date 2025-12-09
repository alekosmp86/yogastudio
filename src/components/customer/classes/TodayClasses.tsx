"use client";

import { ApiType } from "@/enums/ApiTypes";
import { http } from "@/lib/http";
import { ScheduledClassExtended } from "@/types/schedule/ScheduledClassExtended";
import { Activity, useEffect, useState, Suspense } from "react";
import ClassCard from "./ClassCard";

export default function TodayClasses() {
  const [upcomingClasses, setUpcomingClasses] = useState<ScheduledClassExtended[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTodayClasses = async () => {
      setLoading(true);
      const { data }: { data: ScheduledClassExtended[] } = await http.get("/customer/classes/today", ApiType.FRONTEND);
      setUpcomingClasses(
        data.sort((a, b) =>
          a.schedule[0].startTime.localeCompare(b.schedule[0].startTime)
        )
      );
      setLoading(false);
    };

    getTodayClasses();
  }, []);

  return (
    <div className='p-4 flex flex-col gap-6'>
      <h1 className='text-2xl font-bold text-primary-800'>Today’s Classes</h1>

      <Suspense fallback={<p className='text-primary-800'>Loading classes...</p>}>
        <Activity>
          <div className='flex flex-col gap-4'>
            {upcomingClasses.map((gymClass) => {
              return gymClass.schedule.map((schedule) => {
                return (
                  <ClassCard
                    key={schedule.id}
                    gymClass={gymClass}
                    schedule={schedule}
                  />
                );
              });
            })}
          </div>
        </Activity>
      </Suspense>

      <Activity mode={upcomingClasses.length === 0 && !loading ? "visible" : "hidden"}>
        <p className='text-primary-800'>No classes scheduled for today.</p>
      </Activity>
    </div>
  );
}
