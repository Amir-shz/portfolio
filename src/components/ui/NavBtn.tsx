"use client";

import { navBtnProps } from "@/types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavBtn({ href, children }: navBtnProps): React.ReactNode {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={` hover:text-purple-500 transition-all duration-200 px-6 py-3 rounded-2xl font-bold text-base ${
        path === href ? "bg-purple-50 text-purple-500" : "text-neutral-500"
      }`}
    >
      {children}
    </Link>
  );
}

export default NavBtn;
