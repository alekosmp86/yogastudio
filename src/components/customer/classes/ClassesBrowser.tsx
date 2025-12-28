import { cn } from "@/lib/utils/utils";
import { DailyClass } from "@/types/classes/DailyClass";
import ClassesTab from "./ClassesTab";
import Button from "@/components/shared/Button";

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
    <div className="w-full">
      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-primary-900/30 mb-2">
        {dates.map((date) => (
          <Button
            key={date}
            onClick={() => setActiveDate(date)}
            variant={activeDate === date ? "primary" : "secondary"}
            className={cn(
              "rounded-sm px-2 py-1 text-sm transition-colors",
              activeDate === date
                ? "border-b-2 border-primary-700 text-primary-900"
                : "text-secondary-500 hover:text-primary-900"
            )}
          >
            {date}
          </Button>
        ))}
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
