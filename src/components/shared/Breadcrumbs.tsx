import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const links = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    return { name: seg.replace(/-/g, " ").replace('owner', 'home'), href };
  });

  return (
    <nav className='flex items-center text-md text-brand-400'>
      <ol className='flex flex-wrap items-center gap-2'>
        {links.map((item, index) => (
          <li key={item.href} className='flex items-center gap-2'>
            {index > 0 && <span className='text-brand-600'>/</span>}

            <Link
              href={item.href}
              className='capitalize hover:scale-110 transition underline'
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}