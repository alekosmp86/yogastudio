import { AppPreference } from "@/types/preferences/AppPreference";

type PreferencesTableProps = {
  preferences: AppPreference[];
  onChange: (preference: AppPreference) => void;
};

export default function PreferencesTable({
  preferences,
  onChange,
}: PreferencesTableProps) {
  return (
    <div className='hidden md:block overflow-hidden rounded-sm border border-primary-900 shadow-sm'>
      <table className='w-full text-brand-200 border-collapse'>
        <thead className='bg-primary-900/20'>
          <tr>
            <th className='text-center w-[30%]'></th>
            <th className='text-center w-[70%]'></th>
          </tr>
        </thead>

        <tbody>
          {preferences.map((preference) => {
            const value = preference.value;
            return (
              <tr
                key={preference.id}
                className='border-t border-primary-900/40 bg-white text-primary-900 hover:bg-gray-100'
              >
                {/* Preference column */}
                <td className='px-4 py-3 text-right font-medium'>
                  {preference.label}
                </td>

                {/* Value column */}
                <td className='px-4 py-3 text-left'>
                  {preference.type === "boolean" ? (
                    <input
                      type='checkbox'
                      checked={value === "true"}
                      onChange={(e) =>
                        onChange({...preference, value: String(e.target.checked)})
                      }
                      className='h-5 w-5 accent-primary-700 cursor-pointer'
                    />
                  ) : (
                    <input
                      type='text'
                      value={value}
                      onChange={(e) => onChange({...preference, value: e.target.value})}
                      className='w-full rounded-md border border-primary-900/40 bg-transparent px-3 py-1.5 text-brand-200 placeholder:text-brand-200/50 focus:outline-none focus:ring-2 focus:ring-primary-700'
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
