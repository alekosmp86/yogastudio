"use client";

import React from "react";
import { Sun, Flame, Sparkles, Dumbbell } from "lucide-react";
import { GymClass } from "@/types/GymClass";
import { Card, CardContent } from "@/components/shared/Card";
import { Progress } from "@/components/shared/Progress";
import Button from "@/components/shared/Button";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  sun: Sun,
  flame: Flame,
  sparkle: Sparkles,
  default: Dumbbell,
};

export default function ClassCard({ gymClass }: { gymClass: GymClass }) {
  const Icon = ICON_MAP[gymClass.icon] || ICON_MAP.default;

  const percentage = (gymClass.reserved / gymClass.capacity) * 100;

  // ✔ TEMPORARY HANDLER
  const handleReserve = () => {
    console.log("Reserved class:", gymClass.name);
    alert(`You reserved: ${gymClass.name}`);
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 flex items-center gap-4">
        <Icon className="h-8 w-8 text-blue-600 flex-shrink-0" />

        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <h2 className="font-semibold">{gymClass.name}</h2>
            <span className="text-sm text-gray-600">{gymClass.time}</span>
          </div>

          <p className="text-sm text-gray-700">
            Instructor: {gymClass.instructor}
          </p>

          <div className="mt-2">
            <Progress value={percentage} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">
              {gymClass.reserved}/{gymClass.capacity} spots filled
            </p>
          </div>

          {/* Reserve Button */}
          <div className="mt-3">
            <Button
              size="sm"
              variant="primary"
              onClick={handleReserve}
              className="w-full md:w-auto"
            >
              Reserve
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
