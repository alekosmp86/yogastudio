type MobileNavItemProps = {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  executeFn?: () => void;
};

export default function MobileNavItem({
  label,
  href,
  Icon,
  active,
  executeFn,
}: MobileNavItemProps) {
  const handleClick = () => {
    if (executeFn) executeFn();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
    >
      <Icon
        className={`w-5 h-5 ${active ? "text-primary-900" : "text-gray-500"}`}
      />
      <span className={`${active ? "text-primary-900" : "text-gray-500"} font-semibold`}>{label}</span>
    </a>
  );
}
