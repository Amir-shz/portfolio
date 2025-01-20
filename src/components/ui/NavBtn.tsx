"use client";

import { navBtnProps } from "@/types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavBtn({ href, children }: navBtnProps): React.ReactNode {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={` hover:text-purple-500 transition-all duration-200 px-6 py-3 rounded-xl font-bold text-base leading-[1.125rem] ${
        path === href
          ? "bg-purple-50 text-purple-500 border border-purple-200 shadow-shadow4"
          : "text-neutral-600"
      }`}
    >
      {children}
    </Link>
  );
}

export default NavBtn;
