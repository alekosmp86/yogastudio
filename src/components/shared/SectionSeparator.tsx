type SectionSeparatorProps = {
  label: string;
  color?: string;
};

export function SectionSeparator({
  label,
  color,
}: SectionSeparatorProps) {
  return (
    <div className="col-span-full flex items-center my-4">
      <div className={`flex-grow border-t border-${color}`} />
      <span className={`mx-4 text-sm uppercase font-semibold tracking-wider text-${color}`}>
        {label}
      </span>
      <div className={`flex-grow border-t border-${color}`} />
    </div>
  );
}
