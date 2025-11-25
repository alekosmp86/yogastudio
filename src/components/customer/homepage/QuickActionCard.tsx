import type { LucideIcon } from "lucide-react";
import Link from "next/link";

export default function QuickActionCard({
  label,
  href,
  icon: Icon,
}: {
  label: string;
  href: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center p-5 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
    >
      <Icon className="h-8 w-8 text-blue-600 mb-3" />
      <span className="text-gray-800 font-medium">{label}</span>
    </Link>
  );
}