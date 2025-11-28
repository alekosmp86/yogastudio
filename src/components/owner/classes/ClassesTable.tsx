import TableHeader from "./TableHeader";
import { GymClass } from "@/types/classes/GymClass";
import { GymClassBase } from "@/types/classes/GymClassBase";
import EditableRow from "./EditableRow";

type ClassesTableProps = {
  classes: GymClass[];
  fields: { key: keyof GymClass; placeholder: string }[];
  adding: boolean;
  handleSaveNew: (gymClass: GymClassBase) => void;
  handleUpdate: (id: number, updated: GymClass) => void;
  handleDelete: (id: number) => void;
  handleCancelAdd: () => void;
};

export default function ClassesTable({
  classes,
  fields,
  adding,
  handleSaveNew,
  handleUpdate,
  handleDelete,
  handleCancelAdd,
}: ClassesTableProps) {
  return (
    <div className='hidden md:block overflow-hidden shadow-sm border border-primary-900'>
      <table className='w-full text-center text-brand-200'>
        <TableHeader fields={fields} />

        <tbody>
          {classes.length === 0 && !adding && (
            <tr>
              <td colSpan={5} className='text-center py-4'>
                No classes found
              </td>
            </tr>
          )}

          {classes.map((c) => (
            <EditableRow
              key={c.id}
              fields={fields}
              gymClass={c}
              onSaveNew={(gymClass) => handleSaveNew(gymClass)}
              onUpdate={(id, updated) => handleUpdate(id, updated)}
              onDelete={(id) => handleDelete(id)}
              onCancel={() => {}}
            />
          ))}

          {adding && (
            <EditableRow
              gymClass={{
                id: 0,
                title: "",
                instructor: "",
                description: "",
                capacity: 0,
              }}
              adding
              fields={fields}
              onSaveNew={(gymClass) => handleSaveNew(gymClass)}
              onUpdate={(id, updated) => handleUpdate(id, updated)}
              onCancel={handleCancelAdd}
            />
          )}
        </tbody>
      </table>
    </div>
  );
}
