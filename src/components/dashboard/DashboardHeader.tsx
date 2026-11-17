import { logOut } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import { CalendarDays, Globe, LogOut, Settings } from "lucide-react";
import UserPhoto from "./UserPhoto";
import MobileDashboardMenu from "./MobileDashboardMenu";

async function DashboardHeader() {
  const user = await getCurrentUser();
  const today = new Date().toLocaleDateString("fa-IR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="glass flex items-center justify-between gap-3 rounded-2xl py-2 pe-2 ps-3">
        <div className="flex min-w-0 items-center gap-3">
          <MobileDashboardMenu />
          <UserPhoto img={user?.photo} name={user?.name?.[0]} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-6 text-ink">{user?.name}</p>
            <p className="truncate text-[0.6875rem] text-ink-faint">
              {user?.role === "OWNER" ? "مدیر کل" : "مدیر"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="chip me-1 hidden bg-iris-wash text-iris-deep md:inline-flex">
            <CalendarDays className="size-3.5" aria-hidden />
            {today}
          </span>
          <Link
            href="/"
            aria-label="مشاهده وب‌سایت"
            className="icon-btn size-9 bg-white/70 text-ink-soft hover:bg-white hover:text-iris max-lg:hidden"
          >
            <Globe className="size-4" aria-hidden />
          </Link>
          <Link
            href="/dashboard/userSettings"
            aria-label="تنظیمات حساب"
            className="icon-btn size-9 bg-white/70 text-ink-soft hover:bg-white hover:text-iris"
          >
            <Settings className="size-4" aria-hidden />
          </Link>
          <form action={logOut} className="max-lg:hidden">
            <button
              type="submit"
              aria-label="خروج از حساب"
              className="icon-btn size-9 bg-danger-tint text-danger hover:bg-danger hover:text-white"
            >
              <LogOut className="size-4" aria-hidden />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
