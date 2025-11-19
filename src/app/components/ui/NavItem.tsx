export default function NavItem({
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
      className={`flex items-center gap-2 transition ${
        active
          ? "text-blue-600 font-semibold"
          : "text-gray-700 hover:text-blue-600"
      }`}
    >
      <Icon
        className={`h-4 w-4 ${active ? "text-blue-600" : "text-gray-500"}`}
      />
      {label}
    </a>
  );
}
