"use client";

import { useEffect, useState } from "react";
import Button from "@/components/shared/Button";
import EditableRow from "./EditableRow";
import { ApiType } from "@/enums/ApiTypes";
import { http } from "@/lib/http";
import { GymClass } from "@/types/classes/GymClass";
import { GymClassBase } from "@/types/classes/GymClassBase";
import { CreateClassResponse } from "@/types/classes/CreateClassResponse";
import { RequestStatus } from "@/enums/RequestStatus";
import { RequestResponse } from "@/types/RequestResponse";
import TableHeader from "./TableHeader";
import { useToast } from "@/components/shared/Toast";

export default function ClassTable() {
  const [classes, setClasses] = useState<GymClass[]>([]);
  const [adding, setAdding] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchClasses = async () => {
      const data: GymClass[] = await http.get(
        "/owner/classes",
        ApiType.FRONTEND
      );
      setClasses(data);
    };
    fetchClasses();
  }, []);

  // --- CREATE ---
  const handleSaveNew = async (gymClass: GymClassBase) => {
    const { message, id }: CreateClassResponse = await http.post<CreateClassResponse>(
      "/owner/classes",
      ApiType.FRONTEND,
      gymClass
    );

    if (message === RequestStatus.CREATE_ERROR) {
      showToast("Error creating class", "error");
      return; 
    }

    setClasses((prev) => [...prev, { ...gymClass, id }]);
    setAdding(false);
    showToast("Class created successfully", "success");
  };

  // --- UPDATE ---
  const handleUpdate = async (id: number, updated: GymClassBase) => {
    const response = await http.put<RequestResponse>(
      `/owner/classes/${id}`,
      ApiType.FRONTEND,
      updated
    );

    if (response.message === RequestStatus.UPDATE_ERROR) {
      showToast("Error updating class", "error");
      return;
    }

    setClasses((prev) =>
      prev.map((c) => (c.id === id ? { id, ...updated } : c))
    );
    showToast("Class updated successfully", "success");
  };

  // --- DELETE ---
  const handleDelete = async (id: number) => {
    const response = await http.delete<RequestResponse>(
      `/owner/classes/${id}`,
      ApiType.FRONTEND
    );
    if (response.message === RequestStatus.DELETE_ERROR) {
      showToast("Error deleting class", "error");
      return;
    }

    setClasses((prev) => prev.filter((c) => c.id !== id));
    showToast("Class deleted successfully", "success");
  };

  // --- CANCEL ADD ROW ---
  const handleCancelAdd = () => {
    setAdding(false);
  };

  const fields: { key: keyof GymClass; placeholder: string }[] = [
    { key: "title", placeholder: "Class title" },
    { key: "instructor", placeholder: "Instructor" },
    { key: "description", placeholder: "Description" },
    { key: "capacity", placeholder: "Capacity" },
  ];

  return (
    <div className='bg-brand-700 rounded-xl p-6 shadow-xl border border-brand-700'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold text-brand-400'>Your Classes</h2>
        <Button
          variant='primary'
          onClick={() => setAdding(true)}
          disabled={adding}
        >
          Add Class
        </Button>
      </div>

      <div className='overflow-x-auto rounded-sm border border-brand-600'>
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
                onDelete={(id) => handleDelete(id)}
                onCancel={handleCancelAdd}
              />
            )}
          </tbody>
        </table>
      </div>

      {classes.length > 0 && (
        <p className='mt-3 text-xs text-brand-500 block sm:hidden'>
          Scroll → to view the full table
        </p>
      )}
    </div>
  );
}

