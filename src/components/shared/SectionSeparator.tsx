type SectionSeparatorProps = {
  label: string;
  color?: string;
};

export function SectionSeparator({
  label,
  color = "white",
}: SectionSeparatorProps) {
  return (
    <div className="col-span-full flex items-center my-4">
      <div className={`flex-grow border-t border-${color}/20`} />
      <span className={`mx-4 text-sm uppercase tracking-wider text-${color}/60`}>
        {label}
      </span>
      <div className={`flex-grow border-t border-${color}/20`} />
    </div>
  );
}
