"use client";

import Link from "next/link";
import { ReactNode } from "react";

type DashboardCardProps = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};

export default function DashboardCard({ title, description, href, icon }: DashboardCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-xl p-6 shadow-md bg-theme-bodybg hover:bg-secondary-50/80 transition-all cursor-pointer border border-primary"
    >
      <div className="flex items-center gap-4">
        <div className="text-primary-900 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-primary-900">{title}</h3>
          <p className="text-sm text-primary-900">{description}</p>
        </div>
      </div>
    </Link>
  );
}
