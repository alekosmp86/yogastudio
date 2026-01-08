type PageSectionWithHeaderProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function PageSectionWithHeader({
  title,
  description,
  children,
}: PageSectionWithHeaderProps) {
  return (
    <section className="mt-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col items-start justify-between">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="text-sm text-gray-300">{description}</p>
      </div>

      {children}
    </section>
  );
}
