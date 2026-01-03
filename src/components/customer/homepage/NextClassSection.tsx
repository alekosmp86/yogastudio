"use client";

import Button from "@/components/shared/Button";
import { NotebookPen } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NextClassSection() {
  const { t } = useTranslation();

  return (
    <section className="mx-4 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 p-6 shadow-md">
      <h2 className="text-lg font-semibold text-primary-800">
        {t("nextClass")}
      </h2>

      <p className="text-sm text-primary-600 mt-1">
        {t("nextClassDescription")}
      </p>

      <span className="flex justify-end">
        <Button
          Icon={NotebookPen}
          size="sm"
          variant="primary"
          className="mt-2 block rounded-xl px-6 py-3"
          onClick={() => {}}
        >
          {t("bookNow")}
        </Button>
      </span>
    </section>
  );
}
