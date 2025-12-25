type AttendanceToggleProps = {
  reservationId: number;
  attended: boolean | null;
  onToggleAttendance: (id: number, attended: boolean) => void;
};

export function AttendanceToggle({
  reservationId,
  attended,
  onToggleAttendance,
}: AttendanceToggleProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onToggleAttendance(reservationId, true)}
        className={`
          px-3 py-1 rounded text-sm font-semibold
          ${attended === true ? "bg-green-600 text-white" : "bg-gray-700 text-gray-300"}
        `}
      >
        ✔
      </button>

      <button
        onClick={() => onToggleAttendance(reservationId, false)}
        className={`
          px-3 py-1 rounded text-sm font-semibold
          ${attended === false ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300"}
        `}
      >
        ✖
      </button>
    </div>
  );
}
