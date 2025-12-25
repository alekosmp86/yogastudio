import { CapacityBar } from "@/components/shared/CapacityBar";

type ReservationsAccordionHeaderProps = {
  title: string;
  booked: number;
  capacity: number;
};

export default function ReservationsAccordionHeader({
  title,
  booked,
  capacity,
}: ReservationsAccordionHeaderProps) {
  const percentage = Math.round((booked / capacity) * 100);

  const color =
    percentage >= 100
      ? "text-red-400"
      : percentage >= 70
      ? "text-yellow-400"
      : "text-green-400";

  return (
    <div className="w-full">
      {/* Row 1: Title */}
      <div className="text-sm font-medium text-white truncate">
        {title}
      </div>

      {/* Row 2: Capacity info */}
      <div className="flex items-center gap-3 mt-2">
        <CapacityBar reserved={booked} capacity={capacity} />

        <span className={`text-xs font-semibold ${color}`}>
          {booked}/{capacity}
        </span>
      </div>
    </div>
  );
}

