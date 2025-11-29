import { GymClass } from "@/types/classes/GymClass";
import ClassesCard from "./ClassesCard";

type ClassesCardListProps = {
    classes: GymClass[];
    adding: boolean;
    fields: { key: keyof GymClass; placeholder: string }[];
    handleSaveNew: (gymClass: GymClass) => void;
    handleUpdate: (id: number, updated: GymClass) => void;
    handleCancelAdd: () => void;
    handleDelete: (id: number) => void;
}

export default function ClassesCardList({classes, adding, fields, handleSaveNew, handleUpdate, handleCancelAdd, handleDelete}: ClassesCardListProps) {
    return (
        <div className="md:hidden bg-primary flex flex-col gap-4 shadow-sm">
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