"use client";

import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        {label && (
          <label
            htmlFor={`input${label}`}
            className="mb-1 text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <div
          id={label ? `input${label}` : undefined}
          className={clsx(
            "flex items-center rounded-lg border px-3 py-2 bg-white transition",
            error
              ? "border-red-500"
              : "border-[#7FB3C1] focus-within:border-[#2A7A9D]",
            className
          )}
        >
          {icon && <span className="mr-2 text-gray-500">{icon}</span>}

          <input
            ref={ref}
            className="w-full bg-transparent outline-none text-gray-900"
            {...props}
          />
        </div>

        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
