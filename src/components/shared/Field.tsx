export default function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-primary-700">
        {label}
      </label>
      <input
        {...props}
        className="mt-1 w-full rounded-md border border-primary-200 px-3 py-2 text-primary-800
                   focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
      />
    </div>
  );
}
