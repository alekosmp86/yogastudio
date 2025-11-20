import ClassCard from "./_components/ClassCard";
import { GymClassesData } from "./_mock-data/GymClassesData";

export default function ClassesPage() {
  return (
    <div className="p-4 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Today’s Classes</h1>

      <div className="flex flex-col gap-4">
        {GymClassesData.map((c) => (
          <ClassCard key={c.id} gymClass={c} />
        ))}
      </div>
    </div>
  );
}
