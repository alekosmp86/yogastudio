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
import Container from "@/components/shared/Container";
import { useTranslation } from "react-i18next";
import Button from "@/components/shared/Button";

const fields: TableField<GymClass>[] = [
  {
    key: "title",
    required: true,
    placeholder: "Title",
    style: "font-semibold",
  },
  {
    key: "instructor",
    required: true,
    placeholder: "Instructor",
    style: "",
  },
  {
    key: "description",
    required: false,
    placeholder: "Description",
    style: "font-semibold",
  },
  {
    key: "capacity",
    required: true,
    placeholder: "Capacity",
    mobileLabel: "Capacity",
    style: "font-semibold",
  },
];

export default function ClassesList() {
  const { t } = useTranslation();
  const { classes, addClass, updateClass, removeClass } = useClasses();
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState(false);
  const { showToast, hideToast } = useToast();

  const toolbar = useMemo<Toolbar>(
    () => ({
      items: [
        {
          text: "",
          icon: Plus,
          onClick: () => setAdding(true),
        },
      ],
      searchInput: {
        active: true,
        placeholder: t("search"),
        value: search,
        onChange: setSearch,
      },
    }),
    [search, setSearch]
  );

  const filteredClasses = classes.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const showSuccessToast = (message: string) => {
    showToast({
      type: ToastType.SUCCESS,
      message,
    });
  };

  const showErrorToast = (message: string) => {
    showToast({
      type: ToastType.ERROR,
      message,
    });
  };

  const showWarningToast = (message: string) => {
    return showToast({
      type: ToastType.WARNING,
      message,
      persistent: true,
    });
  };

  // --- CREATE ---
  const handleSaveNew = async (gymClass: GymClassBase) => {
    const toastId = showWarningToast("Creating class...");
    try {
      setBusy(true);
      const { message, data }: ApiResponse<GymClass> = await http.post<
        ApiResponse<GymClass>
      >("/owner/classes", ApiType.FRONTEND, gymClass);
      if (message === RequestStatus.ERROR) {
        showErrorToast("Error creating class");
        return;
      }

      addClass(data!);
      setAdding(false);
      showSuccessToast("Class created successfully");
    } catch {
      showErrorToast("Error creating class");
    } finally {
      hideToast(toastId);
      setBusy(false);
    }
  };

  // --- UPDATE ---
  const handleUpdate = async (id: number, updated: GymClassBase) => {
    const toastId = showWarningToast("Updating class...");
    try {
      setBusy(true);
      const { message } = await http.put<ApiResponse<void>>(
        `/owner/classes/${id}`,
        ApiType.FRONTEND,
        updated
      );

      if (message === RequestStatus.ERROR) {
        showErrorToast("Error updating class");
        return;
      }

      updateClass({ id, ...updated });
      showSuccessToast("Class updated successfully");
    } catch {
      showErrorToast("Error updating class");
    } finally {
      hideToast(toastId);
      setBusy(false);
    }
  };

  // --- DELETE ---
  const handleDelete = async (id: number) => {
    const toastId = showWarningToast("Deleting class...");
    try {
      setBusy(true);
      const { message, data } = await http.delete<ApiResponse<number>>(
        `/owner/classes/${id}`,
        ApiType.FRONTEND
      );
      if (message === RequestStatus.ERROR) {
        showErrorToast("Error deleting class");
        return;
      }

      removeClass(data!);
      showSuccessToast("Class deleted successfully");
    } catch {
      showErrorToast("Error deleting class");
    } finally {
      hideToast(toastId);
      setBusy(false);
    }
  };

  // --- CANCEL ADD ROW ---
  const handleCancelAdd = () => {
    setAdding(false);
  };

  return (
    <Container>
      <section className="mt-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">
            {t("yourClasses")}
          </h2>
        </div>

        {/* CONTENT */}
        <div className="rounded-3xl bg-custom-50 shadow-sm">
          <TableToolbar
            toolbar={toolbar}
            search={search}
            setSearch={setSearch}
          />

          <div className="p-4 min-h-[calc(100vh-400px)]">
            <ClassesTable
              classes={filteredClasses}
              fields={fields}
              adding={adding}
              busy={busy}
              handleSaveNew={handleSaveNew}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              handleCancelAdd={handleCancelAdd}
            />

            <ClassesCardList
              classes={filteredClasses}
              fields={fields}
              adding={adding}
              busy={busy}
              handleSaveNew={handleSaveNew}
              handleUpdate={handleUpdate}
              handleCancelAdd={handleCancelAdd}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </section>
    </Container>
  );
}
