"use client";

import Button from "@/components/shared/Button";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { http } from "@/lib/http";
import { NextClass } from "@/types/classes/NextClass";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ArrowBigRightDash, NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/lib/contexts/ToastContext";
import { ToastType } from "@/enums/ToastType";

export default function NextClassSection() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [nextClass, setNextClass] = useState<NextClass | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const fetchNextClass = async () => {
      const { message, data } = await http.get<ApiResponse<NextClass>>(
        "/customer/classes/next",
        ApiType.FRONTEND
      );

      if (message === RequestStatus.SUCCESS) {
        setNextClass(data!);
        setIsBooked(data!.reservations.some((r) => !r.cancelled));
      }
    };
    fetchNextClass();
  }, []);

  const handleBookNow = async () => {
    if (!nextClass) return;
    const { message } = await http.post<ApiResponse<NextClass>>(
      "/customer/classes/next",
      ApiType.FRONTEND,
      {
        id: nextClass!.id,
      }
    );

    switch (message) {
      case RequestStatus.SUCCESS:
        showToast({
          type: ToastType.SUCCESS,
          message: t("classBookedSuccessfully"),
          duration: 3000,
        });
        setIsBooked(true);
        break;
      case RequestStatus.CLASS_ALREADY_RESERVED:
        showToast({
          type: ToastType.INFO,
          message: t("classAlreadyBooked"),
          duration: 3000,
        });
        setIsBooked(true);
        break;
      case RequestStatus.CLASS_FULL:
        showToast({
          type: ToastType.ERROR,
          message: t("classFull"),
          duration: 3000,
        });
        setIsBooked(false);
        break;
      case RequestStatus.ON_WAITING_LIST:
        showToast({
          type: ToastType.INFO,
          message: t("onWaitingList"),
          duration: 3000,
        });
        setIsBooked(true);
        break;
      default:
        showToast({
          type: ToastType.ERROR,
          message: t("error"),
          duration: 3000,
        });
        setIsBooked(false);
        break;
    }
  };

  return (
    <section className="mx-4 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 p-5 shadow-md">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        {/* Header */}
        <h1 className="text-xl md:text-2xl font-bold text-primary-800 flex items-center justify-center md:justify-start gap-2">
          {t("nextClass")}
          <ArrowBigRightDash className="hidden md:inline-block" />
        </h1>

        {/* Class info */}
        <div className="flex flex-col gap-1 text-center md:text-left md:flex-1">
          <h2 className="text-lg font-semibold text-primary-800">
            {nextClass?.template.title}
          </h2>

          {nextClass?.template.description && (
            <p className="text-sm text-primary-600">
              {nextClass.template.description}
            </p>
          )}

          <p className="text-sm text-primary-600 font-medium">
            {nextClass?.template.instructor}
          </p>
        </div>

        {/* Meta + CTA */}
        <div className="flex flex-col items-center gap-3 md:items-end">
          <span className="text-sm font-semibold text-primary-700">
            {nextClass?.date} · {nextClass?.startTime}
          </span>

          {nextClass && (
            <Button
              Icon={NotebookPen}
              size="sm"
              variant={isBooked ? "secondary" : "primary"}
              className="rounded-xl px-6 py-2"
              onClick={handleBookNow}
              disabled={isBooked}
            >
              {isBooked ? t("alreadyBooked") : t("bookNow")}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
