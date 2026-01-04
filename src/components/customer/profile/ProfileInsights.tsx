import { useTranslation } from "react-i18next";
import ProfileInsightCard from "./ProfileInsightCard";

type ProfileInsightsProps = {
  reservationsCount: number;
  upcomingReservations: number;
  penalties: number;
};

export default function ProfileInsights({
  reservationsCount,
  upcomingReservations,
  penalties,
}: ProfileInsightsProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <ProfileInsightCard label={t("totalReservations")} value={reservationsCount} />
      <ProfileInsightCard label={t("upcomingClasses")} value={upcomingReservations} />
      <ProfileInsightCard label={t("penalties")} value={penalties} />
    </div>
  );
}
