"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface navBtnProps {
  href: string;
  children: ReactNode;
}

function NavBtn({ href, children }: navBtnProps): React.ReactNode {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={` transition-all duration-200 px-6 py-3 rounded-2xl font-bold text-base ${
        path === href ? "bg-purple-50 text-purple-500" : "text-neutral-500"
      }`}
    >
      {children}
    </Link>
  );
}

export default NavBtn;
