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
    <div
      className={clsx(
        "rounded-xl border border-custom-200 bg-custom-50 shadow-sm overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-custom-400"
      >
        <span className="text-sm sm:text-base">{header}</span>

        <ChevronDown
          className={clsx(
            "h-5 w-5 text-custom-300 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Content */}
      <div
        className={clsx(
          "grid transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-2 text-sm text-custom-300 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
