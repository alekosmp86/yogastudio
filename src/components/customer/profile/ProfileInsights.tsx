import { useTranslation } from "react-i18next";
import ProfileInsightCard from "./ProfileInsightCard";

type ProfileInsightsProps = {
  reservationsCount: number;
  upcomingReservations: number;
};

export default function ProfileInsights({
  reservationsCount,
  upcomingReservations,
}: ProfileInsightsProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-4">
      <ProfileInsightCard label={t("totalReservations")} value={reservationsCount} />
      <ProfileInsightCard label={t("upcomingClasses")} value={upcomingReservations} />
    </div>
  );
}
