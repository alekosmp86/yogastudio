import { PreferenceTypes } from "@/enums/PreferenceTypes";
import { cn } from "@/lib/utils/utils";
import { AppPreference } from "@/types/preferences/AppPreference";
import React from "react";

type PreferencesTableProps = {
  preferences: AppPreference[];
  onChange: (preference: AppPreference) => void;
  className?: string;
};

function groupByCategory(preferences: AppPreference[]) {
  const groups: Record<string, AppPreference[]> = {};

  for (const pref of preferences) {
    if (!groups[pref.category]) {
      groups[pref.category] = [];
    }
    groups[pref.category].push(pref);
  }

  return groups;
}

export default function PreferencesTable({
  preferences,
  onChange,
  className,
}: PreferencesTableProps) {
  const grouped = groupByCategory(preferences);
  const categories = Object.keys(grouped);

  return (
    <div
      className={cn(
        "hidden md:block overflow-hidden rounded-sm border border-primary-900 shadow-sm",
        className
      )}
    >
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
              {/* Category separator */}
              <tr>
                <td
                  colSpan={2}
                  className={cn(
                    "px-4 py-2 text-left text-sm font-semibold uppercase tracking-wide text-white bg-theme-headings/80",
                    categoryIndex > 0 && "border-t-2 border-primary-900"
                  )}
                >
                  {category}
                </td>
              </tr>

              {/* Preferences */}
              {grouped[category].map((preference) => {
                const value = preference.value;

                return (
                  <tr
                    key={preference.id}
                    className='bg-white text-primary-900'
                  >
                    <td className='px-4 py-3 text-right font-medium'>
                      {preference.label}
                    </td>

                    <td className='px-4 py-3 text-left'>
                      {preference.type === PreferenceTypes.BOOLEAN ? (
                        <input
                          type='checkbox'
                          checked={value === true}
                          onChange={(e) =>
                            onChange({
                              ...preference,
                              value: e.target.checked,
                            })
                          }
                          className='h-5 w-5 cursor-pointer accent-primary-700'
                        />
                      ) : (
                        <input
                          type='text'
                          value={value as string}
                          onChange={(e) =>
                            onChange({
                              ...preference,
                              value: e.target.value,
                            })
                          }
                          className='w-full rounded-md border border-primary-900/40 bg-transparent px-3 py-1.5 text-brand-200 placeholder:text-brand-200/50 focus:outline-none focus:ring-2 focus:ring-primary-700'
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
