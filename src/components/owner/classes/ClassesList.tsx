"use client";

import { useMemo, useState } from "react";
import { ApiType } from "@/enums/ApiTypes";
import { http } from "@/lib/http";
import { GymClass } from "@/types/classes/GymClass";
import { GymClassBase } from "@/types/classes/GymClassBase";
import { RequestStatus } from "@/enums/RequestStatus";
import { useToast } from "@/lib/contexts/ToastContext";
import { useClasses } from "@/lib/contexts/ClassesContext";
import { ApiResponse } from "@/types/requests/ApiResponse";
import { ToastType } from "@/enums/ToastType";
import ClassesTable from "./ClassesTable";
import ClassesCardList from "./ClassesCardList";
import TableToolbar from "@/components/shared/TableToolbar";
import { Plus } from "lucide-react";
import { Toolbar } from "@/types/Toolbar";
import { TableField } from "@/types/TableField";

const fields: TableField<GymClass>[] = [
  { key: "title", required: true, placeholder: "Title", style: "font-semibold" },
  { key: "instructor", required: true, placeholder: "Instructor" },
  { key: "description", required: false, placeholder: "Description", style: "mt-2" },
  { key: "capacity", required: true, placeholder: "Capacity", mobileLabel: "Capacity" },
];

export default function ClassesList() {
  const { classes, addClass, updateClass, removeClass } = useClasses();
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState("");
  const { showToast } = useToast();

  const toolbar = useMemo<Toolbar>(
    () => ({
      items: [{
        icon: Plus,
        onClick: () => setAdding(true),
      }],
      searchInput: {
        active: true,
        placeholder: "Search classes...",
        value: search,
        onChange: setSearch,
      },
    }),
    [search, setSearch]
  );

  const filteredClasses = classes.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

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
    <div className='w-full mt-4'>
      <h2 className='text-xl font-semibold text-theme-inputbg mb-4'>
        Your Classes
      </h2>

      {/* TABLE BOX (toolbar + table inside) */}
      <div className='bg-theme-bodybg rounded-sm border border-theme-bodycolor overflow-hidden shadow'>
        {/* TOOLBAR sitting as the table header */}
        <TableToolbar
          toolbar={toolbar}
          search={search}
          setSearch={setSearch}
        />

        {/* TABLE (desktop) + CARDS (mobile) */}
        <div className='overflow-x-auto max-h-[500px] overflow-y-auto'>
          <ClassesTable
            classes={filteredClasses}
            fields={fields}
            adding={adding}
            handleSaveNew={handleSaveNew}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            handleCancelAdd={handleCancelAdd}
          />

          <ClassesCardList
            classes={filteredClasses}
            fields={fields}
            adding={adding}
            handleSaveNew={handleSaveNew}
            handleUpdate={handleUpdate}
            handleCancelAdd={handleCancelAdd}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
