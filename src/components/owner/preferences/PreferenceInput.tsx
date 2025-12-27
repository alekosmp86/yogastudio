import { AppPreference } from "@/types/preferences/AppPreference";
import { PreferenceTypes } from "@/enums/PreferenceTypes";

type PreferenceInputProps = {
  preference: AppPreference;
  onChange: (p: AppPreference) => void;
};

export default function PreferenceInput({
  preference,
  onChange,
}: PreferenceInputProps) {
  const value = preference.value;

  if (preference.type === PreferenceTypes.BOOLEAN) {
    return (
      <input
        type='checkbox'
        checked={value === true}
        onChange={(e) => onChange({ ...preference, value: e.target.checked })}
        className='h-5 w-5 cursor-pointer accent-primary-700'
      />
    );
  }

  return (
    <input
      type='text'
      value={value as string}
      onChange={(e) => onChange({ ...preference, value: e.target.value })}
      className='w-full rounded-md border border-primary-900/40 bg-transparent px-3 py-1.5 text-black placeholder:text-brand-200/50 focus:outline-none focus:ring-2 focus:ring-primary-700'
    />
  );
}
