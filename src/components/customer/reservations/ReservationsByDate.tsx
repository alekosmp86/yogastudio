import { cn } from "@/lib/utils/utils";
import { ClassReservation } from "@/types/reservations/ClassReservation";
import ReservationCard from "./ReservationCard";
import { useAppPreferences } from "@/lib/contexts/AppPreferencesContext";
import { useTranslation } from "react-i18next";
import { BusinessTime } from "@/lib/utils/date";

type ReservationsByDateProps = {
  date: string;
  reservations: ClassReservation[];
  onCancel: (id: number) => void;
};

export default function ReservationsByDate({
  date,
  reservations,
  onCancel,
}: ReservationsByDateProps) {
  const { t } = useTranslation();
  const { getPreferenceByName } = useAppPreferences();
  const timezone = getPreferenceByName<string>("timezone")!;
  const language = getPreferenceByName<string>("language")!;
  const businessTime = new BusinessTime(timezone);
  const today = date.startsWith(businessTime.now().date);

  return (
    <section className="flex flex-col gap-4">
      {/* Date header */}
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2",
          today ? "bg-custom-100/30" : "bg-transparent"
        )}
      >
        <div className="flex flex-col">
          <h2
            className={cn(
              "text-base font-semibold",
              today ? "text-custom-400" : "text-custom-300"
            )}
          >
            {businessTime.formatDate(date, language)}
          </h2>

          {today && (
            <span className="text-xs font-medium text-custom-200">
              {t("today")}
            </span>
          )}
        </div>

        <div className="flex-1 h-px bg-custom-200/40" />
      </div>

      {/* Reservations */}
      <div className="flex flex-col gap-3 overflow-y-auto max-h-[65vh]">
        {reservations.map((r) => (
          <ReservationCard key={r.id} reservation={r} onCancel={onCancel} />
        ))}
      </div>
    </section>
  );
}
