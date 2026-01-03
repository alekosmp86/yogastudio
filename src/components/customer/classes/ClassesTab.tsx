import { DailyClass } from "@/types/classes/DailyClass";
import ClassCard from "./ClassCard";

type ClassesTabProps = {
  date: string;
  classes: DailyClass[];
  handleReserve: (gymClass: DailyClass) => void;
  handleCancelation: (gymClass: DailyClass) => void;
};

export default function ClassesTab({
  classes,
  handleReserve,
  handleCancelation,
}: ClassesTabProps) {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-425px)]">
      {classes.map((gymClass) => (
        <ClassCard
          key={`${gymClass.date}-${gymClass.startTime}`}
          gymClass={gymClass}
          handleReserve={() => handleReserve(gymClass)}
          handleCancelation={() => handleCancelation(gymClass)}
          canReserve={gymClass.available}
        />
      ))}
    </div>
  );
}
