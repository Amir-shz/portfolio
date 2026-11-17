"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/dashboard/blog", label: "نوشته‌ها" },
  { href: "/dashboard/blog/categories", label: "دسته‌بندی‌ها" },
];

function BlogTabs() {
  const pathname = usePathname();
  return (
    <nav aria-label="بخش‌های بلاگ" className="mb-5 inline-flex gap-1 rounded-xl border border-white/70 bg-white/50 p-1 backdrop-blur-lg">
      {tabs.map((t) => {
        const active = t.href === "/dashboard/blog" ? pathname === t.href : pathname.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-lg px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors",
              active ? "bg-white text-iris-deep shadow-sm" : "text-ink-soft hover:text-ink",
            )}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default BlogTabs;
