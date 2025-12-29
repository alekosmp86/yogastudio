import { ClassReservation } from "@/types/reservations/ClassReservation";
import { Card, CardContent } from "@/components/shared/Card";
import Button from "@/components/shared/Button";
import { X } from "lucide-react";

type ReservationCardProps = {
  reservation: ClassReservation;
  onCancel: (id: number) => void;
};

export default function ReservationCard({
  reservation,
  onCancel,
}: ReservationCardProps) {
  const { id, class: c } = reservation;

  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-primary-800">{c.template.title}</h3>
          <span className="text-sm font-medium text-primary-700">
            {c.startTime}
          </span>
        </div>

        {c.template.description && (
          <p className="text-sm text-primary-800">{c.template.description}</p>
        )}

        <p className="text-sm text-primary-700">
          Instructor:{" "}
          <span className="font-medium">{c.template.instructor}</span>
        </p>

        <div className="flex justify-end pt-2">
          <Button size="sm" variant="negative" onClick={() => onCancel(id)}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
