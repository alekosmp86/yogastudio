type NavItemProps = {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  executeFn?: () => void;
};

export default function NavItem({
  label,
  href,
  Icon,
  active,
  executeFn,
}: NavItemProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (executeFn) executeFn();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
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
