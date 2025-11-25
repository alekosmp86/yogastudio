import { GymClass } from "@/types/classes/GymClass";
import { useState, useEffect, useRef } from "react";

type Props = {
  classes: GymClass[];
  onSelect: (cls: GymClass | null) => void;
  onClose: () => void;
};

export default function ClassSelectorDropdown({ classes, onSelect, onClose }: Props) {
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = classes.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.instructor.toLowerCase().includes(search.toLowerCase())
  );

  // close when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute z-50 bg-brand-800 border border-brand-500 rounded-md shadow-xl p-2 w-52"
    >
      <input
        className="w-full mb-2 px-2 py-1 rounded bg-brand-700 text-brand-100 text-sm"
        placeholder="Search class..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        onClick={() => onSelect(null)}
        className="w-full text-left px-2 py-1 text-xs text-brand-400 hover:bg-brand-600 rounded"
      >
        ✖ Remove class
      </button>

      <div className="max-h-48 overflow-y-auto mt-1">
        {filtered.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c)}
            className="w-full text-left px-2 py-2 hover:bg-brand-500 rounded mb-1"
          >
            <div className="font-semibold text-brand-100 text-sm">{c.title}</div>
            <div className="text-xs text-brand-300">{c.instructor}</div>
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="text-center text-xs text-brand-500 py-2">
            No matches
          </div>
        )}
      </div>
    </div>
  );
}
