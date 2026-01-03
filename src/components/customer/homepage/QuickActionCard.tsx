import type { LucideIcon } from "lucide-react";
import Link from "next/link";

type QuickActionCardProps = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export default function QuickActionCard({
  label,
  href,
  icon: Icon,
}: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-primary-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-400"
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 transition group-hover:bg-primary-100">
        <Icon className="h-6 w-6 text-primary-700" />
      </div>

      <span className="text-sm font-medium text-gray-800 text-center">
        {label}
      </span>
    </Link>
  );
}
