import { GymClass } from "@/types/classes/GymClass";
import ClassesCard from "./ClassesCard";

type ClassesCardListProps = {
    classes: GymClass[];
    adding: boolean;
    busy: boolean;
    fields: { key: keyof GymClass; placeholder: string }[];
    handleSaveNew: (gymClass: GymClass) => void;
    handleUpdate: (id: number, updated: GymClass) => void;
    handleCancelAdd: () => void;
    handleDelete: (id: number) => void;
}

export default function ClassesCardList({classes, adding, busy, fields, handleSaveNew, handleUpdate, handleCancelAdd, handleDelete}: ClassesCardListProps) {
    return (
        <div className="md:hidden flex flex-col gap-2 rounded-md shadow-sm">
            {adding && (
                <ClassesCard
                    gymClass={{
                        id: 0,
                        title: "",
                        instructor: "",
                        description: "",
                        capacity: 0,
                    }}
                    adding
                    busy={busy}
                    fields={fields}
                    onSaveNew={handleSaveNew}
                    onUpdate={handleUpdate}
                    onCancel={handleCancelAdd}
                />
            )}
            
            {classes.map((c) => (
                <ClassesCard
                    key={c.id}
                    gymClass={c}
                    adding={adding}
                    busy={busy}
                    fields={fields}
                    onSaveNew={handleSaveNew}
                    onUpdate={handleUpdate}
                    onCancel={handleCancelAdd}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    )
}