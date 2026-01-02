"use client";

import React, { useState } from "react";
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
import { Time } from "@/static/Time";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { FileSymlink } from "lucide-react";
import Button from "@/components/shared/Button";

export default function WeeklyScheduleGrid() {
  // grid columns: 70px for hour column, then 1fr per weekday (keeps flexible)
  const gridCols = `70px repeat(${Time.WEEKDAYS.length}, minmax(140px, 1fr))`;
  const { classes } = useClasses();
  const { scheduledClasses, setScheduledClasses } = useScheduledClasses();
  const [dayTime, setDayTime] = useState<{ weekday: number; hour: string }>({
    weekday: 0,
    hour: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();
  const { t } = useTranslation();

  const scheduledClass = scheduledClasses.find(
    (scheduledClass) =>
      scheduledClass.weekday === dayTime.weekday &&
      scheduledClass.hour === dayTime.hour
  );
  const classInSchedule = classes.find((c) => c.id === scheduledClass?.classId);

  const showClassSelectorModal = (weekday: number, hour: string) => {
    setDayTime({ weekday, hour });
    setModalOpen(true);
  };

  const handleClassClick = async (c: GymClass) => {
    handleCloseModal();

    const payload = {
      weekday: dayTime.weekday,
      hour: dayTime.hour,
      classId: c.id,
    };

    const request = classInSchedule
      ? http.put<ApiResponse<ScheduledClass>>(
          `/owner/schedule/${classInSchedule.id}`,
          ApiType.FRONTEND,
          payload
        )
      : http.post<ApiResponse<ScheduledClass>>(
          "/owner/schedule",
          ApiType.FRONTEND,
          payload
        );

    const { message, data } = await request;

    if (message === RequestStatus.SUCCESS) {
      showToast({
        message: "Class added to schedule successfully",
        type: ToastType.SUCCESS,
      });
      setScheduledClasses(
        classInSchedule
          ? scheduledClasses.map((s) => {
              return s.classId === classInSchedule.id &&
                s.weekday === data!.weekday &&
                s.hour === data!.hour
                ? data!
                : s;
            })
          : [...scheduledClasses, data!]
      );
    } else {
      showToast({
        message: "Error adding class to schedule",
        type: ToastType.ERROR,
      });
    }
  };

  const findClassInSchedule = (weekday: number, hour: string) => {
    return classes.find(
      (c) =>
        c.id ===
        scheduledClasses.find(
          (scheduledClass) =>
            scheduledClass.weekday === weekday && scheduledClass.hour === hour
        )?.classId
    );
  };

  const handleRemoveClass = async () => {
    if (!scheduledClass) return;

    const request = http.delete<ApiResponse<void>>(
      `/owner/schedule/${scheduledClass.id}`,
      ApiType.FRONTEND
    );

    const { message } = await request;

    if (message === RequestStatus.SUCCESS) {
      showToast({
        message: "Class removed from schedule successfully",
        type: ToastType.SUCCESS,
      });
      setScheduledClasses(
        scheduledClasses.filter((s) => s.id !== scheduledClass.id)
      );
    } else {
      showToast({
        message: "Error removing class from schedule",
        type: ToastType.ERROR,
      });
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setDayTime({ weekday: 0, hour: "" });
  };

  return (
    <>
      {/* Modal that will be displayed when assigning a class to a schedule cell */}
      <ClassSelectorModal
        open={modalOpen}
        emptyCell={!scheduledClass}
        onClose={handleCloseModal}
        onRemove={handleRemoveClass}
        title={t("selectClass")}
      >
        <div className="grid gap-3">
          {classes.length > 0 ? (
            classes.map((c) => (
              <Card
                key={c.id}
                onClick={() => handleClassClick(c)}
                className="cursor-pointer bg-custom-50 border border-custom-100 hover:bg-custom-200 hover:shadow-md transition"
              >
                <CardContent className="py-3 px-4">
                  <div className="text-base font-semibold text-custom-400">
                    {c.title}
                  </div>
                  <div className="text-xs text-custom-300">{c.instructor}</div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center">
              {t("noClassesFound")}. {t("createClassesFirst")}{" "}
              <Link href="/owner/classes">
                {
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 font-semibold text-custom-600 hover:text-custom-50 underline"
                  >
                    <FileSymlink className="w-4 h-4 inline" />
                    {t("goToClasses")}
                  </Button>
                }
              </Link>
            </p>
          )}
        </div>
      </ClassSelectorModal>

      <section className="w-full mt-6">
        <h2 className="text-lg sm:text-xl font-semibold text-custom-50 mb-3">
          {t("weeklySchedule")}
        </h2>

        {/* Schedule container */}
        <div className="relative rounded-xl bg-custom-50 shadow-lg border border-custom-100 overflow-hidden">
          <div className="overflow-x-auto max-h-[65vh] overflow-y-auto">
            <div
              className="grid min-w-max text-custom-400"
              style={{ gridTemplateColumns: gridCols }}
            >
              {/* Header */}
              <ScheduleHeader />

              {/* Rows */}
              {Time.HOURS.map((hour) => (
                <React.Fragment key={hour}>
                  <HourCell hour={hour} />
                  {Time.WEEKDAYS.map((d, index) => (
                    <DayCell
                      key={`${d}-${hour}`}
                      data={findClassInSchedule(index, hour)}
                      onClick={() => showClassSelectorModal(index, hour)}
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs text-custom-100 sm:hidden text-center">
          ← Swipe to explore the full week →
        </p>
      </section>
    </>
  );
}
