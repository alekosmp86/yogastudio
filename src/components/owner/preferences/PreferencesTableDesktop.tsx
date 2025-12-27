import { AppPreference } from "@/types/preferences/AppPreference";
import React from "react";
import { cn } from "@/lib/utils/utils";
import PreferenceInput from "./PreferenceInput";

type PreferencesTableDesktopProps = {
  grouped: Record<string, AppPreference[]>;
  categories: string[];
  onChange: (p: AppPreference) => void;
  className?: string;
};

export default function PreferencesTableDesktop({
  grouped,
  categories,
  onChange,
  className,
}: PreferencesTableDesktopProps) {
  return (
    <div className={cn('hidden md:block overflow-hidden rounded-sm border border-primary-900 shadow-sm', className)}>
      <table className='w-full border-collapse text-brand-200'>
        <thead className='bg-primary-900/20'>
          <tr>
            <th className='w-[30%]' />
            <th className='w-[70%]' />
          </tr>
        </thead>

        <tbody>
          {categories.map((category, categoryIndex) => (
            <React.Fragment key={category}>
              <tr>
                <td
                  colSpan={2}
                  className={cn(
                    "px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white bg-theme-headings/80",
                    categoryIndex > 0 && "border-t-2 border-primary-900"
                  )}
                >
                  {category}
                </td>
              </tr>

              {grouped[category].map((preference) => (
                <tr key={preference.id} className='bg-white text-primary-900'>
                  <td className='px-4 py-3 text-right font-medium'>
                    {preference.label}
                  </td>

                  <td className='px-4 py-3 text-left'>
                    <PreferenceInput
                      preference={preference}
                      onChange={onChange}
                    />
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
