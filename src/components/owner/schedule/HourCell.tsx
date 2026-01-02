"use client";

export function HourCell({ hour }: { hour: string }) {
  return (
    <div
      className="sticky left-0 z-20 flex items-center justify-center px-3 py-4 text-xs sm:text-sm font-semibold text-custom-300 bg-custom-100 border border-custom-50"
      style={{ minWidth: 70 }}
    >
      {hour}
    </div>
  );
}
