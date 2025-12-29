import { DateUtils } from "@/lib/utils/date";
import { cn } from "@/lib/utils/utils";
import { ClassReservation } from "@/types/reservations/ClassReservation";
import ReservationCard from "./ReservationCard";

type ReservationsByDateProps = {
  date: string;
  reservations: ClassReservation[];
  onCancel: (id: number) => void;
};

const isToday = (date: string) => {
  const today = DateUtils.toDateOnly(new Date());
  return date.startsWith(today);
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString(undefined, {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

export default function ReservationsByDate({
  date,
  reservations,
  onCancel,
}: ReservationsByDateProps) {
  const today = isToday(date);

  return (
    <section className="flex flex-col gap-3">
      {/* Date header */}
      <div
        className={cn(
          "flex items-center gap-4",
          today && "bg-primary-900/10 rounded-md px-3 py-2"
        )}
      >
        <h2
          className={cn(
            "text-lg font-semibold",
            today ? "text-primary-900" : "text-primary-800"
          )}
        >
          {formatDate(date)}
          {today && (
            <span className="ml-2 text-sm font-medium text-primary-700">
              (Today)
            </span>
          )}
        </h2>
        <div className="flex-1 h-px bg-primary-900/30" />
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-4">
        {reservations.map((r) => (
          <ReservationCard key={r.id} reservation={r} onCancel={onCancel} />
        ))}
      </div>
    </section>
  );
}
