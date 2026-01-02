import { GymClass } from "@/types/classes/GymClass";
import { GymClassBase } from "@/types/classes/GymClassBase";
import EditableRow from "./EditableRow";
import TableHeader from "@/components/shared/TableHeader";
import { useTranslation } from "react-i18next";

type ClassesTableProps = {
  classes: GymClass[];
  fields: { key: keyof GymClass; placeholder: string }[];
  adding: boolean;
  busy: boolean;
  handleSaveNew: (gymClass: GymClassBase) => void;
  handleUpdate: (id: number, updated: GymClass) => void;
  handleDelete: (id: number) => void;
  handleCancelAdd: () => void;
};

export default function ClassesTable({
  classes,
  fields,
  adding,
  busy,
  handleSaveNew,
  handleUpdate,
  handleDelete,
  handleCancelAdd,
}: ClassesTableProps) {
  const { t } = useTranslation();

  return (
    <div className="hidden md:block overflow-hidden rounded-md shadow-sm ring-1 ring-custom-200 backdrop-blur">
      <table className="w-full text-custom-500">
        <TableHeader fields={fields} />

        <tbody>
          {classes.length === 0 && !adding && (
            <tr>
              <td
                colSpan={fields.length}
                className="px-6 py-6 text-left text-sm text-custom-300"
              >
                {t("noClassesFound")}
              </td>
            </tr>
          )}

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
              busy={busy}
              fields={fields}
              onSaveNew={(gymClass) => handleSaveNew(gymClass)}
              onUpdate={(id, updated) => handleUpdate(id, updated)}
              onCancel={handleCancelAdd}
            />
          )}

          {classes.map((c) => (
            <EditableRow
              key={c.id}
              busy={busy}
              fields={fields}
              gymClass={c}
              onSaveNew={(gymClass) => handleSaveNew(gymClass)}
              onUpdate={(id, updated) => handleUpdate(id, updated)}
              onDelete={(id) => handleDelete(id)}
              onCancel={() => {}}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
