"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

export function Accordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-md bg-black shadow-sm mb-1">
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-4 text-left font-semibold text-white"
      >
        {title}
        <ChevronDown
          className={clsx(
            "h-5 w-5 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Content */}
      <div
        className={clsx(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-4 pt-0 text-sm text-info-500">
          {children}
        </div>
      </div>
    </div>
  );
}
