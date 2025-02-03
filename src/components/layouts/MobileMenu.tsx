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
import NavBtn from "../ui/NavBtn";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "../ui/Logo";
import XIcon from "../icons/XIcon";

function MobileMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="sm:hidden">
      <Drawer direction="top" open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger>
          <MenuIcon />
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay className="fixed inset-0 bg-neutral-50/15 backdrop-blur-sm">
            <DrawerContent className="top-0 w-full h-min mt-0 rounded-b-3xl rounded-t-none [&>div:first-child]:hidden">
              <DialogTitle></DialogTitle>
              <div className="flex justify-between items-center px-6 py-3 mb-1 ">
                <button
                  className="[&>svg]:size-8"
                  onClick={() => setIsOpen(false)}
                >
                  <XIcon />
                </button>
                <Logo />
              </div>
              <nav className=" flex flex-col gap-3 justify-center items-center mb-4">
                <NavBtn href="/">صفحه اصلی</NavBtn>
                <NavBtn href="/about-me">درباره من</NavBtn>
                <NavBtn href="/services">خدمات</NavBtn>
                <NavBtn href="/contact-me">ارتباط با من</NavBtn>
              </nav>
            </DrawerContent>
          </DrawerOverlay>
        </DrawerPortal>
      </Drawer>
    </div>
  );
}

export default MobileMenu;
