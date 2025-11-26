"use client";

export function HourCell({ hour }: { hour: string }) {
  return (
    <div
      className='px-3 py-4 border-b border-brand-600 text-xs sm:text-sm bg-brand-800 sticky left-0 z-20'
      style={{ minWidth: 70 }}
    >
      {hour}
    </div>
  );
}
