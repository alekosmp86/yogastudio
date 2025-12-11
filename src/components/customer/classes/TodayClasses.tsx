"use client";

import { ApiType } from "@/enums/ApiTypes";
import { http } from "@/lib/http";
import { Activity, useEffect, useState, Suspense } from "react";
import ClassCard from "./ClassCard";
import { DailyClass } from "@/types/classes/DailyClass";

export default function TodayClasses() {
  const [upcomingClasses, setUpcomingClasses] = useState<DailyClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTodayClasses = async () => {
      setLoading(true);
      const { data }: { data: DailyClass[] } = await http.get(
        "/customer/classes/today",
        ApiType.FRONTEND
      );
      setUpcomingClasses(
        data.sort((a, b) => a.startTime.localeCompare(b.startTime))
      );
      setLoading(false);
    };

    getTodayClasses();
  }, []);

  return (
    <div className='p-4 flex flex-col gap-6 h-full'>
      <h1 className='text-2xl font-bold text-primary-800'>Today’s Classes</h1>

      {/* Scroll area */}
      <div className='overflow-y-auto max-h-[70vh] pr-2'>
        <Suspense
          fallback={<p className='text-primary-800'>Loading classes...</p>}
        >
          <div className='flex flex-col gap-4'>
            {upcomingClasses.map((gymClass) => (
              <ClassCard key={gymClass.id} gymClass={gymClass} />
            ))}
          </div>
        </Suspense>
      </div>

      {/* When there are NO classes */}
      <Activity
        mode={upcomingClasses.length === 0 && !loading ? "visible" : "hidden"}
      >
        <p className='text-primary-800'>No classes scheduled for today.</p>
      </Activity>
    </div>
  );
}
