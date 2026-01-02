import { AppPreference } from "@/types/preferences/AppPreference";
import { PreferenceTypes } from "@/enums/PreferenceTypes";
import { useTranslation } from "react-i18next";

type PreferenceInputProps = {
  preference: AppPreference;
  onChange: (p: AppPreference) => void;
};

export default function PreferenceInput({
  preference,
  onChange,
}: PreferenceInputProps) {
  const {t} = useTranslation();
  const value = preference.value;

  if (preference.type === PreferenceTypes.BOOLEAN) {
    return (
      <label className="inline-flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={value === true}
          onChange={(e) => onChange({ ...preference, value: e.target.checked })}
          className="h-5 w-5 rounded accent-custom-300 focus:ring-2 focus:ring-custom-200"
        />
        <span className="text-sm text-custom-400">
          {value ? "Enabled" : "Disabled"}
        </span>
      </label>
    );
  }

  if (preference.type === PreferenceTypes.NUMBER) {
    return (
      <input
        type="number"
        value={value as number}
        onChange={(e) => onChange({ ...preference, value: e.target.valueAsNumber })}
        className="w-full rounded-lg bg-white px-3 py-2 text-sm border border-custom-100 focus:border-custom-200 focus:ring-2 focus:ring-custom-100 outline-none transition"
      />
    );
  }

  if (preference.type === PreferenceTypes.SELECT) {
    return (
      <select
        value={value as string}
        onChange={(e) => onChange({ ...preference, value: e.target.value })}
        className="w-full rounded-lg bg-white px-3 py-2 text-sm border border-custom-100 focus:border-custom-200 focus:ring-2 focus:ring-custom-100 outline-none transition"
      >
        {preference.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type="text"
      value={value as string}
      onChange={(e) => onChange({ ...preference, value: e.target.value })}
      className="w-full rounded-lg bg-white px-3 py-2 text-sm border border-custom-100 focus:border-custom-200 focus:ring-2 focus:ring-custom-100 outline-none transition"
    />
  );
}
