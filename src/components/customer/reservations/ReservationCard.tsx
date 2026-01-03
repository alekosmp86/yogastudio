import { ClassReservation } from "@/types/reservations/ClassReservation";
import { Card, CardContent } from "@/components/shared/Card";
import Button from "@/components/shared/Button";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

type ReservationCardProps = {
  reservation: ClassReservation;
  onCancel: (id: number) => void;
};

export default function ReservationCard({
  reservation,
  onCancel,
}: ReservationCardProps) {
  const { t } = useTranslation();
  const { id, class: c } = reservation;

  return (
    <Card className="bg-white/90 border border-custom-100 rounded-xl shadow-sm hover:shadow-md transition">
      <CardContent className="p-4 flex flex-col gap-3">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-custom-400 leading-tight">
              {c.template.title}
            </h3>
            <span className="text-xs text-custom-200">
              {c.template.instructor}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-custom-300">
              {c.startTime}
            </span>
          </div>
        </div>

        {/* Description */}
        {c.template.description && (
          <p className="text-sm text-custom-300 leading-relaxed">
            {c.template.description}
          </p>
        )}

        {/* Divider */}
        <div className="h-px bg-custom-100/60" />

        {/* Actions */}
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="negative"
            onClick={() => onCancel(id)}
            className="rounded-full px-4"
          >
            <X className="mr-1 h-4 w-4" />
            {t("cancel")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
