"use client";

import React from "react";
import { Sun, Flame, Sparkles, Dumbbell } from "lucide-react";
import { Progress } from "@/components/shared/Progress";
import Button from "@/components/shared/Button";
import { Card, CardContent } from "@/components/shared/Card";
import { GymClassBase } from "@/types/classes/GymClassBase";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  sun: Sun,
  flame: Flame,
  sparkle: Sparkles,
  default: Dumbbell,
};

export default function ClassCard({ gymClass }: { gymClass: GymClassBase }) {
  const Icon = ICON_MAP.default;

  const percentage = (10 / 20) * 100;

  // ✔ TEMPORARY HANDLER
  const handleReserve = () => {};

  return (
    <Card className='shadow-sm'>
      <CardContent className='p-4 flex items-center gap-4'>
        <Icon className='h-8 w-8 text-blue-600 flex-shrink-0' />

        <div className='flex flex-col w-full'>
          <div className='flex justify-between'>
            <h2 className='font-semibold'>Class name</h2>
            <span className='text-sm text-gray-600'>Time</span>
          </div>

          <p className='text-sm text-gray-700'>
            Instructor: Instructor name
          </p>

          <div className='mt-2'>
            <Progress value={percentage} className='h-2' />
            <p className='text-xs text-gray-500 mt-1'>
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
