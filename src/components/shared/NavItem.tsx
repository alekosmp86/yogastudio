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
          ? "text-white font-semibold"
          : "text-white/80 hover:text-primary-400"
      }`}
    >
      <Icon
        className={`h-4 w-4 ${active ? "text-white" : "text-white/80"}`}
      />
      {label}
    </a>
  );
}
