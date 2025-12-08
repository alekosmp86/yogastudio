"use client";

import React from "react";
import { Sun, Flame, Sparkles, Dumbbell } from "lucide-react";
import { Progress } from "@/components/shared/Progress";
import Button from "@/components/shared/Button";
import { Card, CardContent } from "@/components/shared/Card";
import { ScheduledClassExtended } from "@/types/schedule/ScheduledClassExtended";
import { Schedule } from "@/types/schedule/Schedule";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  sun: Sun,
  flame: Flame,
  sparkle: Sparkles,
  default: Dumbbell,
};

type ClassCardProps = {
  gymClass: Omit<ScheduledClassExtended, 'schedule'>;
  schedule: Schedule;
}

export default function ClassCard({ gymClass, schedule }: ClassCardProps) {
  const Icon = ICON_MAP.default;

  const percentage = (10 / 20) * 100;

  const handleReserve = () => {};

  return (
    <Card className='shadow-lg bg-white'>
      <CardContent className='p-4 flex items-center gap-4'>
        <Icon className='h-8 w-8 text-primary-800 flex-shrink-0' />

        <div className='flex flex-col w-full'>
          <div className='flex justify-between'>
            <h2 className='font-semibold text-primary-800'>{gymClass.title}</h2>
            <span className='text-sm text-primary-800'>{schedule.startTime}</span>
          </div>

          <p className='text-sm font-semibold text-primary-800'>{gymClass.description}</p>

          <p className='text-sm text-primary-800'>
            Instructor: {gymClass.instructor}
          </p>

          <div className='mt-2'>
            <Progress value={percentage} className='h-2' />
            <p className='text-xs text-primary-800 mt-1'>
              10/20 spots filled
            </p>
          </div>

          {/* Reserve Button */}
          <div className='mt-3'>
            <Button
              size='sm'
              variant='primary'
              onClick={handleReserve}
              className='w-full md:w-auto'
            >
              Reserve
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
