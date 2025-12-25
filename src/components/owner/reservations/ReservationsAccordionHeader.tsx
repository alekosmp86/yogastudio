import { CapacityBar } from "@/components/shared/CapacityBar";

type ReservationsAccordionHeaderProps = {
  title: string;
  booked: number;
  capacity: number;
  attendance: number;
};

export default function ReservationsAccordionHeader({
  title,
  booked,
  capacity,
  attendance,
}: ReservationsAccordionHeaderProps) {
  const percentage = Math.round((booked / capacity) * 100);

  const color =
    percentage >= 100
      ? "text-green-400"
      : percentage >= 50
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="w-full">
      {/* Row 1: Title */}
      <div className="text-sm font-medium text-white truncate">{title}</div>

      {/* Row 2: Capacity info */}
      <div className="flex flex-col justify-start gap-3 mt-2">
        <CapacityBar reserved={booked} capacity={capacity} />

        <span className="flex flex-row gap-2 items-center">
          <span className={`text-xs font-semibold ${color}`}>
            Booked: [ {booked} / {capacity} ]
          </span>
          <span className="text-xs font-semibold text-gray-400">|</span>
          <span className={`text-xs font-semibold ${color}`}>
            Assisted: [ {attendance} / {booked} ]
          </span>
        </span>
      </div>
    </div>
  );
}
