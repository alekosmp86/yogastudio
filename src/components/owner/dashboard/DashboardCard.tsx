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

export default function DashboardCard({
  title,
  description,
  href,
  icon,
}: DashboardCardProps) {
  const { t } = useTranslation();

  return (
    <Link
      href={href}
      className="group block rounded-2xl bg-white/80 p-5 shadow-sm backdrop-blur transition hover:shadow-md active:scale-[0.98]"
    >
      <div className="flex items-start gap-4">
        {/* ICON */}
        <div
          className="flex h-10 w-10 items-center justify-center text-custom-200 transition group-hover:scale-105"
        >
          {icon}
        </div>

        {/* TEXT */}
        <div className="flex-1">
          <h3 className="text-base font-semibold text-custom-400">{t(title)}</h3>
          <p className="mt-1 text-sm text-custom-200">{t(description)}</p>
        </div>
      </div>
    </Link>
  );
}
