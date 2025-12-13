"use client";

export function HourCell({ hour }: { hour: string }) {
  return (
    <div
      className='px-3 py-4 border-b border-theme-border text-xs sm:text-sm bg-black sticky left-0 z-20 text-primary-50'
      style={{ minWidth: 70 }}
    >
      {hour}
    </div>
  );
}
