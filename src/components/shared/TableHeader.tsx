import { cn } from "@/lib/utils/utils";
import { TableField } from "@/types/TableField";
import { useTranslation } from "react-i18next";

type TableHeaderProps<T> = {
  fields: TableField<T>[];
};

export default function TableHeader<T>({ fields }: TableHeaderProps<T>) {
  const { t } = useTranslation();

  return (
    <>
      <colgroup>
        {fields.map(({key}) => (
          <col key={String(key)}/>
        ))}
        <col style={{ width: "20%" }} />
      </colgroup>

      <thead>
        <tr className="text-left">
          {fields.map(({ key, placeholder, style }) => (
            <th key={String(key)} className={cn("px-4 py-3", style)}>
              {t(placeholder)}
            </th>
          ))}
          <th className="px-4 py-3 text-center font-semibold text-custom-400">
            {t("actions")}
          </th>
        </tr>
      </thead>
    </>
  );
}
