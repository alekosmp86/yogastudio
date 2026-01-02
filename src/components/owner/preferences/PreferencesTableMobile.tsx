import { AppPreference } from "@/types/preferences/AppPreference";
import PreferenceInput from "./PreferenceInput";
import { cn } from "@/lib/utils/utils";
import { useTranslation } from "react-i18next";

type PreferencesTableMobileProps = {
  grouped: Record<string, AppPreference[]>;
  categories: string[];
  onChange: (p: AppPreference) => void;
  className?: string;
};

export default function PreferencesTableMobile({
  grouped,
  categories,
  onChange,
  className,
}: PreferencesTableMobileProps) {
  const { t } = useTranslation();

  return (
    <div className={cn('space-y-6 md:hidden', className)}>
      {categories.map((category) => (
        <div key={category} className='rounded-md border border-primary-900/30'>
          <div className='px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white bg-theme-headings/80'>
            {t(category)}
          </div>

          <div className='divide-y divide-primary-900/20 bg-white'>
            {grouped[category].map((preference) => (
              <div
                key={preference.id}
                className='flex items-center justify-between gap-4 px-4 py-3'
              >
                <span className='text-sm font-medium text-primary-900'>
                  {t(preference.name)}
                </span>

                <PreferenceInput preference={preference} onChange={onChange} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
