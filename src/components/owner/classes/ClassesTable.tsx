"use client";

import { useState } from "react";
import Button from "@/components/shared/Button";
import EditableRow from "./EditableRow";
import { ApiType } from "@/enums/ApiTypes";
import { http } from "@/lib/http";
import { GymClass } from "@/types/classes/GymClass";
import { GymClassBase } from "@/types/classes/GymClassBase";
import { RequestStatus } from "@/enums/RequestStatus";
import TableHeader from "./TableHeader";
import { useToast } from "@/lib/contexts/ToastContext";
import { useClasses } from "@/lib/contexts/ClassesContext";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ToastType } from "@/enums/ToastType";
import { Plus } from "lucide-react";

export default function ClassTable() {
  const { classes, addClass, updateClass, removeClass } = useClasses();
  const [adding, setAdding] = useState(false);
  const { showToast } = useToast();

  // --- CREATE ---
  const handleSaveNew = async (gymClass: GymClassBase) => {
    const { message, data }: ApiResponse<GymClass> = await http.post<ApiResponse<GymClass>>("/owner/classes", ApiType.FRONTEND, gymClass);

    if (message === RequestStatus.ERROR) {
      showToast("Error creating class", ToastType.ERROR);
      return;
    }

    addClass(data!);
    setAdding(false);
    showToast("Class created successfully", ToastType.SUCCESS);
  };

  // --- UPDATE ---
  const handleUpdate = async (id: number, updated: GymClassBase) => {
    const { message }: ApiResponse<RequestStatus> = await http.put<ApiResponse<RequestStatus>>(`/owner/classes/${id}`, ApiType.FRONTEND, updated);

    if (message === RequestStatus.ERROR) {
      showToast("Error updating class", ToastType.ERROR);
      return;
    }

    updateClass({ id, ...updated });
    showToast("Class updated successfully", ToastType.SUCCESS);
  };

  // --- DELETE ---
  const handleDelete = async (id: number) => {
    const { message, data } = await http.delete<ApiResponse<number>>(`/owner/classes/${id}`, ApiType.FRONTEND);
    if (message === RequestStatus.ERROR) {
      showToast("Error deleting class", ToastType.ERROR);
      return;
    }

    removeClass(data!);
    showToast("Class deleted successfully", ToastType.SUCCESS);
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
    <div className='bg-theme-bodybg rounded-sm p-6 shadow-xl border border-brand-700'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold text-primary-800'>Your Classes</h2>
        <Button
          variant='primary'
          onClick={() => setAdding(true)}
          Icon={Plus}
          disabled={adding}
        >
          Add Class
        </Button>
      </div>

      <div className='bg-theme-bodybg overflow-x-auto rounded-sm border border-theme-bodycolor'>
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

      {classes.length > 0 && (
        <p className='mt-3 text-xs text-brand-500 block sm:hidden'>
          Scroll → to view the full table
        </p>
      )}
    </div>
  );
}
