import { UserDetail } from "@/types/users/UserDetail";
import { useTranslation } from "react-i18next";

type CancelledClassesSectionProps = {
  cancelledClasses: UserDetail["cancelledClasses"];
};

export default function CancelledClassesSection({
  cancelledClasses,
}: CancelledClassesSectionProps) {
  const { t } = useTranslation();
  return (
    <section className="bg-custom-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-custom-400 mb-3">
        {t("cancelledClasses")}
      </h3>

      {cancelledClasses.length === 0 ? (
        <p className="text-sm text-custom-400">
          {t("noCancelledClasses")}
        </p>
      ) : (
        <div className="space-y-2 overflow-y-auto max-h-[200px]">
          {cancelledClasses.map((c) => (
            <div
              key={c.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 border-b border-gray-700 pb-2"
            >
              {/* Class title */}
              <span className="text-sm font-medium text-custom-400">{c.title}</span>

              {/* Date + time */}
              <span className="text-xs text-custom-400">
                {c.date} · {c.startTime}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
