"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

type DashboardCardProps = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};

export default function DashboardCard({ title, description, href, icon }: DashboardCardProps) {
  const { t } = useTranslation();
  return (
    <Link
      href={href}
      className="group rounded-md p-6 shadow-md shadow-white/50 bg-theme-bodybg hover:bg-secondary-50/80 transition-all cursor-pointer border border-black/50"
    >
      <div className="flex items-center gap-4">
        <div className="text-primary-900 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-primary-900">{t(title)}</h3>
          <p className="text-sm text-primary-900">{t(description)}</p>
        </div>
      </div>
    </Link>
  );
}
