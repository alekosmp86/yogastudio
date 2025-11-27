"use client";

import React from "react";
import cx from "clsx";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  Icon?: React.ComponentType<{ className?: string }>;
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
    "inline-flex items-center justify-center font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-300";

  const variants: Record<Variant, string> = {
    primary:
      "bg-primary text-brand-600 hover:bg-primary-soft active:bg-primary-soft",
    secondary:
      "bg-secondary text-brand-600 hover:bg-secondary-soft active:bg-secondary-soft",
    ghost:
      "bg-transparent text-brand-600 hover:bg-transparent active:bg-transparent",
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