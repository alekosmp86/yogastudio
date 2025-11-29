"use client";

import React, { useState } from "react";
import { HOURS, WEEKDAYS } from "@/static/StaticMockData";
import { ScheduleHeader } from "./ScheduleHeader";
import { HourCell } from "./HourCell";
import { DayCell } from "./DayCell";
import { ClassSelectorModal } from "./ClassSelectorModal";
import { useClasses } from "@/lib/contexts/ClassesContext";
import { Card, CardContent } from "@/components/shared/Card";
import { GymClass } from "@/types/classes/GymClass";
import { http } from "@/lib/http";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { useToast } from "@/lib/contexts/ToastContext";
import { ToastType } from "@/enums/ToastType";
import { ScheduledClass } from "@/types/schedule/ScheduledClass";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { useScheduledClasses } from "@/lib/contexts/ScheduledClassesContext";

export default function WeeklyScheduleGrid() {
  // grid columns: 70px for hour column, then 1fr per weekday (keeps flexible)
  const gridCols = `70px repeat(${WEEKDAYS.length}, minmax(140px, 1fr))`;
  const { classes } = useClasses();
  const { scheduledClasses, setScheduledClasses } = useScheduledClasses();
  const [dayTime, setDayTime] = useState<{ weekday: number; hour: string }>({ weekday: 0, hour: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();
  
  const scheduledClass = scheduledClasses.find((scheduledClass) => scheduledClass.weekday === dayTime.weekday && scheduledClass.hour === dayTime.hour);
  const classInSchedule = classes.find((c) => c.id === scheduledClass?.classId);

  const showClassSelectorModal = (weekday: number, hour: string) => {
    setDayTime({ weekday, hour });
    setModalOpen(true);
  };

  const handleClassClick = async (c: GymClass) => {
    const payload = { weekday: dayTime.weekday, hour: dayTime.hour, classId: c.id };

    const request = classInSchedule
      ? http.put<ApiResponse<ScheduledClass>>(`/owner/schedule/${classInSchedule.id}`, ApiType.FRONTEND, payload)
      : http.post<ApiResponse<ScheduledClass>>("/owner/schedule", ApiType.FRONTEND, payload);

    const { message, data } = await request;

    if (message === RequestStatus.SUCCESS) {
      showToast("Class added to schedule successfully", ToastType.SUCCESS);
      setScheduledClasses(
        classInSchedule ? scheduledClasses.map((s) => {
              return s.classId === classInSchedule.id &&
                s.weekday === data!.weekday &&
                s.hour === data!.hour
                ? data! : s;
            }) : [...scheduledClasses, data!]
      );
    } else {
      showToast("Error adding class to schedule", ToastType.ERROR);
    }

    handleCloseModal();
  };

  const findClassInSchedule = (weekday: number, hour: string) => {
    return classes.find(
      (c) => c.id === scheduledClasses.find((scheduledClass) => scheduledClass.weekday === weekday && scheduledClass.hour === hour)?.classId
    );
  };

  const handleRemoveClass = async () => {
    if (!scheduledClass) return;

    const request = http.delete<ApiResponse<RequestStatus>>(`/owner/schedule/${scheduledClass.id}`, ApiType.FRONTEND);

    const { message } = await request;

    if (message === RequestStatus.SUCCESS) {
      showToast("Class removed from schedule successfully", ToastType.SUCCESS);
      setScheduledClasses(
        scheduledClasses.filter((s) => s.id !== scheduledClass.id)
      );
    } else {
      showToast("Error removing class from schedule", ToastType.ERROR);
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setDayTime({ weekday: 0, hour: "" });
  };

  return (
    <>
      <ClassSelectorModal
        open={modalOpen}
        emptyCell={!scheduledClass}
        onClose={handleCloseModal}
        onRemove={handleRemoveClass}
        title='Select a Class'
      >
        {classes.map((c) => (
          <Card
            key={c.id}
            onClick={() => handleClassClick(c)}
            className='cursor-pointer transition bg-theme-cardbg hover:bg-primary-300'
          >
            <CardContent className='py-3 px-4'>
              <div className='text-base text-primary-800 font-semibold'>
                {c.title}
              </div>
              <div className='text-xs mt- text-primary-800'>
                {c.instructor}
              </div>
            </CardContent>
          </Card>
        ))}
      </ClassSelectorModal>

      <div className='p-4 sm:p-6 bg-theme-cardbg rounded-sm shadow-xl text-primary-800'>
        <h2 className='text-lg sm:text-xl font-semibold text-primary-800 mb-4'>
          Weekly Schedule
        </h2>

        <div className='relative overflow-x-auto rounded-md border border-primary-900 shadow-inner'>
          <div
            className='grid min-w-max'
            style={{
              gridTemplateColumns: gridCols,
            }}
          >
            {/* Header row */}
            <ScheduleHeader />

            {/* rows: each hour is a row with first the hour cell, then weekday cells */}
            {HOURS.map((hour) => (
              // We intentionally render a sequence of grid items per hour:
              // first the HourCell (sticky left), then WEEKDAYS.length DayCell items.
              <React.Fragment key={hour}>
                <HourCell hour={hour} />
                {WEEKDAYS.map((d, index) => (
                  <DayCell
                    key={`${d.label}-${hour}`}
                    data={findClassInSchedule(index, hour)}
                    onClick={() => showClassSelectorModal(index, hour)}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        <p className='mt-3 text-xs text-textcolor-primary block sm:hidden text-center'>
          👉 Swipe horizontally to view full week
        </p>
      </div>
    </>
  );
}
