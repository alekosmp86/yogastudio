import { AttendanceToggle } from "./AttendanceToggle";

type ReservationWithUser = {
  id: number;
  user: { name: string; email: string };
  attended: boolean | null;
};

type ReservationRowProps = {
  reservation: ReservationWithUser;
  onToggleAttendance: (attended: boolean) => void;
};

export function ReservationRow({
  reservation,
  onToggleAttendance,
}: ReservationRowProps) {
  return (
    <div
      className="
    flex flex-col gap-3 py-3 border-b border-gray-700
    md:flex-row md:items-center md:justify-between
  "
    >
      {/* User info */}
      <div className="flex flex-col">
        <span className="text-white text-sm font-medium">
          {reservation.user.name}
        </span>
        <span className="text-xs text-gray-400">{reservation.user.email}</span>
      </div>

      {/* Attendance toggle */}
      <div className="self-end md:self-auto">
        <AttendanceToggle
          attended={reservation.attended}
          onToggleAttendance={(attended: boolean) => onToggleAttendance(attended)}
        />
      </div>
    </div>
  );
}
