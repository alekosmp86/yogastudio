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
  const {t} = useTranslation();
  const Icon = ICON_MAP.default;
  const percentage = (gymClass.reserved / gymClass.capacity) * 100;

  return (
    <Card className='shadow-lg bg-white'>
      <CardContent className='p-4 flex items-center gap-4'>
        <Icon className='h-8 w-8 text-primary-800 flex-shrink-0' />

        <div className='flex flex-col w-full'>
          <div className='flex justify-between'>
            <h2 className='font-semibold text-primary-800'>{gymClass.title}</h2>
            <span className='text-sm text-primary-800 font-semibold'>
              {gymClass.date} ({gymClass.startTime})
            </span>
          </div>

          <p className='text-sm font-semibold text-primary-800'>
            {gymClass.description}
          </p>

          <p className='text-sm text-primary-800'>
            {t("instructor")}: {gymClass.instructor}
          </p>

          <div className='mt-2'>
            <Progress value={percentage} className='h-2' />
            <p className='text-xs text-primary-800 mt-1'>
              {gymClass.reserved}/{gymClass.capacity} {t("spotsFilled")}
            </p>
          </div>

          {/* Reserve Button */}
          {canReserve ? (
            <div className='mt-3 flex justify-end'>
              <Button
                size='sm'
                variant='primary'
                onClick={handleReserve}
                className='w-full md:w-auto'
              >
                <ClockCheck className='mr-2 h-4 w-4' />
                {t("book")}
              </Button>
            </div>
          ) : (
            <div className='mt-3 flex justify-end'>
              <Button
                size='sm'
                variant='negative'
                onClick={handleCancelation}
                className='w-full md:w-auto'
              >
                <X className='mr-2 h-4 w-4' />
                {t("cancel")}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
