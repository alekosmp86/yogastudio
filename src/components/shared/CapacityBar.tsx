type CapacityBarProps = {
  reserved: number;
  capacity: number;
};

export function CapacityBar({ reserved, capacity }: CapacityBarProps) {
  const percent = Math.min(
    100,
    Math.round((reserved / capacity) * 100)
  );

  return (
    <div className="flex items-center gap-2 w-32">
      <div className="h-2 w-full bg-gray-700 rounded overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
