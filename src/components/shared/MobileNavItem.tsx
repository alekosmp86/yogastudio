type MobileNavItemProps = {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  active: boolean;
};

export default function MobileNavItem({
  label,
  href,
  Icon,
  active,
}: MobileNavItemProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
    >
      <Icon
        className={`w-5 h-5 ${active ? "text-primary-900" : "text-gray-500"}`}
      />
      <span className={`${active ? "text-primary-900" : "text-gray-500"} font-semibold`}>{label}</span>
    </a>
  );
}
