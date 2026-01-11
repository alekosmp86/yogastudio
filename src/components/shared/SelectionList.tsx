"use client";

import { useTranslation } from "react-i18next";

type CheckboxItem = {
  id: number;
  name: string;
};

type SelectionListProps = {
  items: CheckboxItem[];
  selectedIds: number[];
  maxSelectable: number;
  onChange: (selected: number[]) => void;
};

export function SelectionList({
  items,
  selectedIds,
  maxSelectable,
  onChange,
}: SelectionListProps) {
  const { t } = useTranslation();

  const toggle = (id: number) => {
    const isSelected = selectedIds.includes(id);

    if (isSelected) {
      onChange(selectedIds.filter((x) => x !== id));
      return;
    }

    if (selectedIds.length >= maxSelectable) return;

    onChange([...selectedIds, id]);
  };

  return (
    <div className="space-y-2 overflow-y-auto max-h-[25vh]">
      {items.map((item) => {
        const checked = selectedIds.includes(item.id);
        const disabled = !checked && selectedIds.length >= maxSelectable;

        return (
          <label
            key={item.id}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-custom-300 text-sm cursor-pointer ${
              checked ? "bg-custom-100 border-custom-300" : "bg-white"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <input
              type="checkbox"
              checked={checked}
              disabled={disabled}
              onChange={() => toggle(item.id)}
              className="accent-custom-400"
            />
            <span>{item.name}</span>
          </label>
        );
      })}

      <p className="text-xs text-custom-300 justify-self-end">
        {selectedIds.length} / {maxSelectable} {t("selected")}
      </p>
    </div>
  );
}
