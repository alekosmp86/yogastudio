import { X } from "lucide-react";
import Button from "./Button";
import { Toolbar } from "@/types/Toolbar";
import { useTranslation } from "react-i18next";

type TableToolbarProps = {
  toolbar: Toolbar;
  search: string;
  setSearch: (value: string) => void;
};

export default function TableToolbar({
  toolbar,
  search,
  setSearch,
}: TableToolbarProps) {
  const { t } = useTranslation();
  const showToolbar = toolbar.items?.length > 0 || toolbar.searchInput.active;

  if (!showToolbar) return null;

  return (
    <div className="rounded-t-xl bg-custom-100 px-4 py-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* ACTIONS */}
        <div className="flex flex-wrap gap-2">
          {toolbar.items?.map((item, index) => (
            <Button
              key={index}
              variant="primary"
              Icon={item.icon}
              onClick={item.onClick}
              className="rounded-full bg-custom-300 text-white hover:bg-custom-200"
            >
              {item.text}
            </Button>
          ))}
        </div>

        {/* SEARCH */}
        {toolbar.searchInput.active && (
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder={t("search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full bg-white/80 px-4 py-2 pr-10 text-custom-500 placeholder:text-custom-200 focus:outline-none focus:ring-2 focus:ring-custom-200"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-custom-300 hover:text-custom-400"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
