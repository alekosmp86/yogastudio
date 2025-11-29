"use client";

import { useState } from "react";
import Button from "@/components/shared/Button";
import { ApiType } from "@/enums/ApiTypes";
import { http } from "@/lib/http";
import { GymClass } from "@/types/classes/GymClass";
import { GymClassBase } from "@/types/classes/GymClassBase";
import { RequestStatus } from "@/enums/RequestStatus";
import { useToast } from "@/lib/contexts/ToastContext";
import { useClasses } from "@/lib/contexts/ClassesContext";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ToastType } from "@/enums/ToastType";
import { Plus } from "lucide-react";
import ClassesTable from "./ClassesTable";
import ClassesCardList from "./ClassesCardList";

const fields: { key: keyof GymClass; required: boolean; placeholder: string, style?: string, mobileLabel?: string }[] = [
  { key: "title", required: true, placeholder: "Class title", style: "font-semibold" },
  { key: "instructor", required: true, placeholder: "Instructor" },
  { key: "description", required: false, placeholder: "Description", style: "mt-2" },
  { key: "capacity", required: true, placeholder: "Capacity", mobileLabel: "Capacity" },
];

export default function ClassesList() {
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

      <div className='bg-theme-bodybg overflow-x-auto rounded-sm'>
        <ClassesTable
          classes={classes}
          fields={fields}
          adding={adding}
          handleSaveNew={handleSaveNew}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          handleCancelAdd={handleCancelAdd}
        />

        <ClassesCardList
          classes={classes}
          fields={fields}
          adding={adding}
          handleSaveNew={handleSaveNew}
          handleUpdate={handleUpdate}
          handleCancelAdd={handleCancelAdd}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}
