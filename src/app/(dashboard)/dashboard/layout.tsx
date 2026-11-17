import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardNav from "@/components/dashboard/DashboardNav";
import BrandLogo from "@/components/system/BrandLogo";
import { logOut } from "@/lib/actions";
import Link from "next/link";
import { Globe, LogOut } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[15.5rem_minmax(0,1fr)]">
      <aside className="sticky top-0 hidden h-dvh p-4 pe-0 lg:block">
        <div className="glass flex h-full flex-col rounded-[1.5rem] p-3">
          <Link href="/dashboard" className="flex items-center gap-2.5 px-2.5 pb-5 pt-2">
            <BrandLogo className="h-6" />
            <span className="chip bg-iris-wash py-0.5 text-[0.6875rem] text-iris-deep">پنل مدیریت</span>
          </Link>
          <DashboardNav />
          <div className="mt-auto grid gap-0.5 border-t border-ink/[0.06] pt-3">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-white/70 hover:text-ink"
            >
              <Globe className="size-[1.125rem]" strokeWidth={1.8} aria-hidden />
              مشاهده وب‌سایت
            </Link>
            <form action={logOut}>
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-danger transition-colors hover:bg-danger-tint"
              >
                <LogOut className="size-[1.125rem]" strokeWidth={1.8} aria-hidden />
                خروج از حساب
              </button>
            </form>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <DashboardHeader />
        <main className="flex-1 px-4 pb-12 pt-5 sm:px-6 lg:px-8 lg:pt-6">{children}</main>
      </div>
    </div>
  );
}
