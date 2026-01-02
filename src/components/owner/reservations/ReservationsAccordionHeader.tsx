import { CapacityBar } from "@/components/shared/CapacityBar";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const percentageBooked = Math.round((booked / capacity) * 100);
  const percentageAttendance = Math.round((attendance / booked) * 100);

  const colorBooked =
    percentageBooked >= 100
      ? "text-green-700"
      : percentageBooked >= 50
      ? "text-custom-200"
      : "text-red-500/80";

  const colorAttendance =
    percentageAttendance >= 100
      ? "text-green-700"
      : percentageAttendance >= 50
      ? "text-custom-200"
      : "text-red-500/80";

  return (
    <div className="w-full space-y-3">
      {/* Title */}
      <div className="text-sm sm:text-base font-semibold text-custom-400 truncate">
        {title}
      </div>

      {/* Capacity bar */}
      <CapacityBar reserved={booked} capacity={capacity} />

      {/* Stats */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
        <span className={`font-semibold ${colorBooked}`}>
          {t("booked")} <span className="opacity-70">·</span> [{booked}/{capacity}]
        </span>

        <span className="text-custom-200/60 hidden sm:inline">•</span>

        <span className={`font-semibold ${colorAttendance}`}>
          {t("attended")} <span className="opacity-70">·</span> [{attendance}/{booked}]
        </span>
      </div>
    </div>
  );
}
