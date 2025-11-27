"use client";

type DayCellProps = {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export function DayCell({ onClick }: DayCellProps) {
  return (
    <div
      className='
        border border-surface-divider
        bg-surface-input
        text-textcolor-primary
        px-2 py-4 sm:px-3 sm:py-3
        text-xs sm:text-sm
        rounded-sm
        hover:bg-secondary-soft
        transition
        cursor-pointer
      '
      onClick={onClick}
    />
  );
}
