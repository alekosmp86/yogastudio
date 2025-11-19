export default function MobileNavItem({
  label,
  href,
  Icon,
  active,
}: {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  active: boolean;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
    >
      <Icon
        className={`w-5 h-5 ${active ? "text-blue-600" : "text-gray-500"}`}
      />
      {label}
    </a>
  );
}
