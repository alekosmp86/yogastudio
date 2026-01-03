import { cn } from "@/lib/utils/utils";
import { DailyClass } from "@/types/classes/DailyClass";
import ClassesTab from "./ClassesTab";

type ClassesBrowserProps = {
  dates: string[];
  activeDate: string;
  setActiveDate: (date: string) => void;
  sortedClasses: Map<string, DailyClass[]>;
  handleReserve: (gymClass: DailyClass) => void;
  handleCancelation: (gymClass: DailyClass) => void;
};

export default function ClassesBrowser({
  dates,
  activeDate,
  setActiveDate,
  sortedClasses,
  handleReserve,
  handleCancelation,
}: ClassesBrowserProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Date selector */}
      <div className="relative">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-3 px-3 scrollbar-hide">
          {dates.map((date) => {
            const isActive = activeDate === date;

            return (
              <button
                key={date}
                onClick={() => setActiveDate(date)}
                className={cn(
                  "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all",
                  isActive
                    ? "bg-custom-300 text-white shadow-sm"
                    : "bg-custom-50 text-custom-400 border border-custom-100 hover:bg-custom-100"
                )}
              >
                {date}
              </button>
            );
          })}
        </div>

        {/* subtle bottom divider */}
        <div className="h-px bg-custom-100 mt-2" />
      </div>

      {/* Active day content */}
      {activeDate && (
        <ClassesTab
          date={activeDate}
          classes={sortedClasses.get(activeDate) ?? []}
          handleReserve={handleReserve}
          handleCancelation={handleCancelation}
        />
      )}
    </div>
  );
}
