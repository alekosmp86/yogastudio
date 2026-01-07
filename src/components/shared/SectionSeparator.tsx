type SectionSeparatorProps = {
  label: string;
};

export function SectionSeparator({ label }: SectionSeparatorProps) {
  return (
    <div className="col-span-full flex items-center my-4">
      <div className="flex-grow border-t border-white/20" />
      <span className="mx-4 text-sm uppercase tracking-wider text-white/60">
        {label}
      </span>
      <div className="flex-grow border-t border-white/20" />
    </div>
  );
}
