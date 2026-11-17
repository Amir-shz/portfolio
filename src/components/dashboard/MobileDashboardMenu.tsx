"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Globe, LogOut, Menu } from "lucide-react";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { logOut } from "@/lib/actions";
import BrandLogo from "../system/BrandLogo";
import DashboardNav from "./DashboardNav";

// Phone/tablet navigation: a frosted drawer from the right edge.
function MobileDashboardMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger
          aria-label="باز کردن منو"
          className="icon-btn size-9 bg-white/70 text-ink hover:bg-white"
        >
          <Menu className="size-4" aria-hidden />
        </DrawerTrigger>
        <DrawerContent className="inset-x-auto bottom-0 right-0 top-0 mt-0 h-full w-[min(20rem,86vw)] rounded-none rounded-l-[1.5rem] p-3 [&>div:first-child]:hidden">
          <DrawerTitle className="sr-only">منوی داشبورد</DrawerTitle>
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2.5 px-2.5 pb-5 pt-2">
              <BrandLogo className="h-6" />
              <span className="chip bg-iris-wash py-0.5 text-[0.6875rem] text-iris-deep">پنل مدیریت</span>
            </div>
            <DashboardNav onNavigate={() => setIsOpen(false)} />
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
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default MobileDashboardMenu;
