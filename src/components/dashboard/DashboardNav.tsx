"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Clock3, LayoutDashboard, Newspaper, UserRoundCog } from "lucide-react";
import { cn } from "@/lib/utils";

export const dashboardLinks = [
  { href: "/dashboard", label: "خانه", icon: LayoutDashboard },
  { href: "/dashboard/reservations", label: "رزروها", icon: CalendarDays },
  { href: "/dashboard/schedules", label: "زمان‌بندی", icon: Clock3 },
  { href: "/dashboard/blog", label: "بلاگ", icon: Newspaper },
  { href: "/dashboard/userSettings", label: "تنظیمات حساب", icon: UserRoundCog },
];

export function isActive(pathname: string, href: string) {
  return href === "/dashboard" ? pathname === href : pathname.startsWith(href);
}

// Section links for the sidebar and the phone drawer.
function DashboardNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="منوی داشبورد">
      <ul className="grid gap-0.5">
        {dashboardLinks.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                  active
                    ? "bg-iris text-white shadow-iris"
                    : "text-ink-soft hover:bg-white/70 hover:text-ink",
                )}
              >
                <Icon className="size-[1.125rem]" strokeWidth={1.8} aria-hidden />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default DashboardNav;
