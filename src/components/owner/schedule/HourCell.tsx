"use client";

export function HourCell({ hour }: { hour: string }) {
  return (
    <div
      className='px-3 py-4 border-b border-surface-input text-xs sm:text-sm bg-surface-section sticky left-0 z-20'
      style={{ minWidth: 70 }}
    >
      {hour}
    </div>
  );
}
