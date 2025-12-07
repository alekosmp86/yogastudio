import { X } from "lucide-react";
import Button from "./Button";
import { Toolbar } from "@/types/Toolbar";

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
  const showToolbar = toolbar.items?.length > 0 || toolbar.searchInput.active;

  return showToolbar ? (
    <div className='px-4 py-3 border-b border-theme-bodycolor bg-theme-headings'>
      <div className='w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-2'>
          {toolbar.items?.map((item, index) => (
            <Button
              key={index}
              variant='primary'
              Icon={item.icon}
              onClick={item.onClick}
            />
          ))}
        </div>

        {toolbar.searchInput.active && (
          <div className='sm:w-64 w-full text-primary-900 flex items-center'>
            <input
              type='text'
              placeholder='Search...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full bg-white px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-brand-600 transition'
            />
            {search && (
              <Button
                onClick={() => setSearch("")}
                variant='ghost'
                className='absolute right-11'
              >
                <X />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  ) : null;
}
