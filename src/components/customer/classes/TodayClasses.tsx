"use client";

import { ApiType } from "@/enums/ApiTypes";
import { http } from "@/lib/http";
import { Activity, useEffect, useState } from "react";
import ClassCard from "./ClassCard";
import { DailyClass } from "@/types/classes/DailyClass";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { RequestStatus } from "@/enums/RequestStatus";
import { useToast } from "@/lib/contexts/ToastContext";
import { ToastType } from "@/enums/ToastType";
import { CardSkeleton } from "@/components/shared/CardSkeleton";

export default function TodayClasses() {
  const [upcomingClasses, setUpcomingClasses] = useState<DailyClass[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const getTodayClasses = async () => {
      setLoading(true);
      const { message, data } = await http.get<ApiResponse<DailyClass[]>>(
        "/customer/classes/today",
        ApiType.FRONTEND
      );

      if (message === RequestStatus.SUCCESS) {
        setUpcomingClasses(
          data!.sort((a, b) => a.startTime.localeCompare(b.startTime))
        );
      }
      setLoading(false);
    };

    getTodayClasses();
  }, []);

  const handleReserve = async (gymClass: DailyClass) => {
    const { message } = await http.post<ApiResponse<void>>(
      "/customer/reservations",
      ApiType.FRONTEND,
      {
        classId: gymClass.id,
      }
    );

    switch (message) {
      case RequestStatus.SUCCESS:
        setUpcomingClasses((prev) =>
          prev.map((c) =>
            c.id === gymClass.id
              ? { ...c, reserved: c.reserved + 1, available: false }
              : c
          )
        );
        toast.showToast({
          type: ToastType.SUCCESS,
          message: "Class reserved successfully.",
          duration: 3000,
        });
        break;
      case RequestStatus.CLASS_ALREADY_RESERVED:
        toast.showToast({
          type: ToastType.INFO,
          message: "You have already reserved this class.",
          duration: 3000,
        });
        break;
      case RequestStatus.CLASS_FULL:
        toast.showToast({
          type: ToastType.ERROR,
          message:
            "This class is full. You have been added to the waiting list.",
          duration: 3000,
        });
        break;
      case RequestStatus.ON_WAITING_LIST:
        toast.showToast({
          type: ToastType.INFO,
          message: "You are on the waiting list.",
          duration: 3000,
        });
        break;
      default:
        toast.showToast({
          type: ToastType.ERROR,
          message: "An error occurred.",
          duration: 3000,
        });
        break;
    }
  };

  const handleCancelation = async (gymClass: DailyClass) => {
    const { message } = await http.delete<ApiResponse<void>>(
      `/customer/classes/${gymClass.id}/reservation`,
      ApiType.FRONTEND
    );

    switch (message) {
      case RequestStatus.SUCCESS:
        setUpcomingClasses((prev) =>
          prev.map((c) =>
            c.id === gymClass.id
              ? { ...c, reserved: c.reserved - 1, available: true }
              : c
          )
        );
        toast.showToast({
          type: ToastType.SUCCESS,
          message: "Class canceled successfully.",
          duration: 3000,
        });
        break;
      default:
        toast.showToast({
          type: ToastType.ERROR,
          message: "An error occurred.",
          duration: 3000,
        });
        break;
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 h-full">
      <h1 className="text-2xl font-bold text-primary-800">Today’s Classes</h1>

      {/* Scroll area */}
      <div className="overflow-y-auto max-h-[65vh] pr-2">
        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="flex flex-col gap-4 mb-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            upcomingClasses.map((gymClass) => (
              <ClassCard
                key={gymClass.id}
                gymClass={gymClass}
                handleReserve={() => handleReserve(gymClass)}
                handleCancelation={() => handleCancelation(gymClass)}
                canReserve={gymClass.available}
              />
            ))
          )}
        </div>
      </div>

      {/* When there are NO classes */}
      <Activity
        mode={upcomingClasses.length === 0 && !loading ? "visible" : "hidden"}
      >
        <p className="text-primary-800">No classes available for today.</p>
      </Activity>
    </div>
  );
}
