import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const isIdSegment = (seg: string) =>
  /^\d+$/.test(seg) || /^[0-9a-fA-F-]{36}$/.test(seg);

const resolveSegmentLabel = (seg: string) => {
  if (seg === "owner") return "home";
  if (seg === "users") return "users";

  if (isIdSegment(seg)) {
    return "details"; // 👈 generic, safe, non-sensitive
  }

  return seg.replace(/-/g, " ");
};

export default function Breadcrumbs() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const links = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    return {
      name: resolveSegmentLabel(seg),
      href,
    };
  });

  return (
    <nav className="flex items-center text-md text-white">
      <ol className="flex flex-wrap items-center gap-2">
        {links.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 && <span>/</span>}

            <Link
              href={item.href}
              className="capitalize underline hover:scale-110 transition"
            >
              {t(item.name)}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
