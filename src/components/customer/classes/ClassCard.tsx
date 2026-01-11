"use client";

import React from "react";
import { Sun, Flame, Sparkles, Dumbbell, X, ClockCheck } from "lucide-react";
import { Progress } from "@/components/shared/Progress";
import Button from "@/components/shared/Button";
import { Card, CardContent } from "@/components/shared/Card";
import { DailyClass } from "@/types/classes/DailyClass";
import { useTranslation } from "react-i18next";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  sun: Sun,
  flame: Flame,
  sparkle: Sparkles,
  default: Dumbbell,
};

type ClassCardProps = {
  gymClass: DailyClass;
  handleReserve: () => void;
  handleCancelation: () => void;
  canReserve: boolean;
};

export default function ClassCard({
  gymClass,
  handleReserve,
  handleCancelation,
  canReserve,
}: ClassCardProps) {
  const { t } = useTranslation();
  const Icon = ICON_MAP.default;
  const percentage = (gymClass.reserved / gymClass.activity.capacity) * 100;

  return (
    <Card className="bg-white rounded-xl border border-custom-100 shadow-sm hover:shadow-lg transition">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-custom-50">
          <Icon className="h-5 w-5 text-custom-300" />
        </div>

        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <h2 className="font-semibold text-custom-400 leading-tight">
              {gymClass.activity.title}
            </h2>
            <span className="text-xs font-medium text-custom-300">
              {gymClass.startTime}
            </span>
          </div>

          <p className="text-sm text-custom-200 mt-1">{gymClass.activity.description}</p>

          <p className="text-xs text-custom-300">
            {t("instructor")}:{" "}
            <span className="font-medium text-custom-400">
              {gymClass.activity.instructor}
            </span>
          </p>

          <div className="flex flex-col gap-1">
            <Progress value={percentage} className="h-1.5 bg-custom-50" />
            <p className="text-xs text-custom-300">
              {gymClass.reserved}/{gymClass.activity.capacity} {t("spotsFilled")}
            </p>
          </div>

          {/* Reserve Button */}
          {canReserve ? (
            <div className="mt-3 flex justify-end">
              <Button
                size="sm"
                variant="primary"
                onClick={handleReserve}
                className="w-full md:w-auto"
              >
                <ClockCheck className="mr-2 h-4 w-4" />
                {t("book")}
              </Button>
            </div>
          ) : (
            <div className="mt-3 flex justify-end">
              <Button
                size="sm"
                variant="negative"
                onClick={handleCancelation}
                className="w-full md:w-auto"
              >
                <X className="mr-2 h-4 w-4" />
                {t("cancel")}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
