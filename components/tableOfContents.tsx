"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function TableOfContents() {
  const links = [
    { href: "/about", label: "About" },
    { href: "/history", label: "History" },
    { href: "/skills", label: "Skills" },
    { href: "/works", label: "Works" },
    { href: "/contact", label: "Contact" },
  ];
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        <li>
          {links.map(({ href, label }, index) => (
            <Link
              href={href}
              key={index}
              className={clsx(
                "flex justify-end items-center w-full h-10 px-5",
                pathname === href
                  ? "bg-button-bg pointer-events-none lg:text-lg lg:font-bold"
                  : "hover:bg-button-bg-hover cursor-pointer"
              )}
            >
              {label}
            </Link>
          ))}
        </li>
      </ul>
    </nav>
  );
}
