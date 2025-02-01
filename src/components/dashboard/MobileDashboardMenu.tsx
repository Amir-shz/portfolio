"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import MenuIcon from "../icons/MenuIcon";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTrigger,
} from "../ui/drawer";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  HiOutlineArrowLeftStartOnRectangle,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineHome,
  HiOutlineUser,
} from "react-icons/hi2";
import { logOut } from "@/lib/actions";
import Logo from "../ui/Logo";

function MobileDashboardMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="sm:hidden">
      <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger>
          <MenuIcon />
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay className="fixed inset-0 bg-neutral-50/15 backdrop-blur-sm">
            <DrawerContent className="h-full w-2/3 rounded-none mt-0 [&>div:first-child]:hidden">
              <DialogTitle></DialogTitle>
              <div className="flex flex-col justify-between h-full">
                <nav className=" flex flex-col gap-2 py-2 px-2">
                  <div className=" w-full flex justify-center py-4">
                    <Logo />
                  </div>
                  <Link
                    href="/dashboard"
                    className=" w-full bg-purple-400 hover:bg-purple-500 duration-300 rounded-lg py-3 flex items-center gap-2 pr-4 text-neutral-50 text-base font-semibold leading-5"
                  >
                    <HiOutlineHome size={24} className=" stroke-2" />
                    <p>خانه</p>
                  </Link>
                  <Link
                    href="/dashboard/reservations"
                    className=" w-full bg-purple-400 hover:bg-purple-500 duration-300 rounded-lg py-3 flex items-center gap-2 pr-4 text-neutral-50 text-base font-semibold leading-5"
                  >
                    <HiOutlineCalendar size={24} className=" stroke-2" />
                    <p>رزرو ها</p>
                  </Link>
                  <Link
                    href="/dashboard/schedules"
                    className=" w-full bg-purple-400 hover:bg-purple-500 duration-300 rounded-lg py-3 flex items-center gap-2 pr-4 text-neutral-50 text-base font-semibold leading-5"
                  >
                    <HiOutlineClock size={24} className=" stroke-2" />
                    <p>زمان بندی</p>
                  </Link>

                  <Link
                    href="/dashboard/userSettings"
                    className=" w-full bg-purple-400 hover:bg-purple-500 duration-300 rounded-lg py-3 flex items-center gap-2 pr-4 text-neutral-50 text-base font-semibold leading-5"
                  >
                    <HiOutlineUser size={24} className=" stroke-2" />
                    <p>تنظیمات حساب کاربری</p>
                  </Link>
                </nav>
                <div className=" py-2 px-2 flex flex-col gap-2 mb-4">
                  <Link
                    href="/"
                    className=" w-full bg-purple-400 hover:bg-purple-500 duration-300 rounded-lg py-3 flex items-center gap-2 pr-4 text-neutral-50 text-base font-semibold leading-5"
                  >
                    <HiOutlineGlobeAsiaAustralia
                      size={24}
                      className=" stroke-2"
                    />
                    <p>وب سایت</p>
                  </Link>

                  <form action={logOut}>
                    <button className=" w-full bg-error-500 rounded-lg py-3 flex items-center gap-2 pr-4 text-neutral-50 text-base font-semibold leading-5">
                      <HiOutlineArrowLeftStartOnRectangle
                        size={24}
                        className=" text-neutral-50"
                      />
                      <p>خروج از حساب</p>
                    </button>
                  </form>
                </div>
              </div>
            </DrawerContent>
          </DrawerOverlay>
        </DrawerPortal>
      </Drawer>
    </div>
  );
}

export default MobileDashboardMenu;
