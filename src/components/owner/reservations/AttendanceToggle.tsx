type AttendanceToggleProps = {
  attended: boolean | null;
  onToggleAttendance: (attended: boolean) => void;
};

export function AttendanceToggle({
  attended,
  onToggleAttendance,
}: AttendanceToggleProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onToggleAttendance(true)}
        className={`
          px-3 py-1 rounded text-sm font-semibold
          ${attended === true ? "bg-green-600 text-white" : "bg-gray-700 text-gray-300"}
        `}
      >
        ✔
      </button>

      <button
        onClick={() => onToggleAttendance(false)}
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
