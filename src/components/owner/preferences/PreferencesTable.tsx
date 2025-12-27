import { AppPreference } from "@/types/preferences/AppPreference";
import PreferencesTableDesktop from "./PreferencesTableDesktop";
import PreferencesTableMobile from "./PreferencesTableMobile";

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
    <div className={className}>
      <PreferencesTableDesktop
        className='overflow-x-auto max-h-[600px] overflow-y-auto'
        grouped={grouped}
        categories={categories}
        onChange={onChange}
      />

      <PreferencesTableMobile
        className='overflow-x-auto max-h-[300px] overflow-y-auto'
        grouped={grouped}
        categories={categories}
        onChange={onChange}
      />
    </div>
  );
}
