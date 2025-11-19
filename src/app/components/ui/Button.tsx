"use client";

import React from "react";
import cx from "clsx";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  Icon?: React.ComponentType<{ className?: string }>; // optional icon component
};

/**
 * Reusable Button component with Tailwind classes.
 * Usage:
 * <Button onClick={...}>Save</Button>
 * <Button variant="secondary" size="sm">Cancel</Button>
 * <Button Icon={TrashIcon} aria-label="delete" />
 */
export default function Button({
  variant = "primary",
  size = "md",
  Icon,
  children,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants: Record<Variant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 border",
    ghost: "bg-transparent text-blue-600 hover:bg-blue-50",
  };

  const sizes: Record<Size, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };

  return (
    <button
      {...props}
      className={cx(base, variants[variant], sizes[size], className)}
    >
      {Icon && (
        <Icon
          className={cx(
            "mr-2 shrink-0",
            size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6"
          )}
        />
      )}
      {children}
    </button>
  );
}
