"use client";

import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

type AccordionProps = {
  header: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Accordion({ header, children, className }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={clsx("border rounded-sm bg-black/50 shadow-sm", className)}>
      {/* Header */}
      <span
        onClick={() => setOpen((v) => !v)}
        className="w-full cursor-pointer flex items-center justify-between p-4 text-left font-semibold text-white"
      >
        {header}
        <ChevronDown
          className={clsx(
            "h-5 w-5 transition-transform",
            open && "rotate-180"
          )}
        />
      </span>

      {/* Content */}
      <div
        className={clsx(
          "overflow-hidden transition-all duration-300",
          children && open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-4 pt-0 text-sm text-info-500">
          {children}
        </div>
      </div>
    </div>
  );
}
