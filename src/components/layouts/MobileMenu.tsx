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

function MobileMenu() {
  return (
    <div className="sm:hidden">
      <Drawer direction="right">
        <DrawerTrigger>
          <MenuIcon />
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay className="fixed inset-0 bg-neutral-50/15 backdrop-blur-sm">
            <DrawerContent className=" h-dvh w-64 rounded-none [&>div:first-child]:hidden">
              <DialogTitle></DialogTitle>
              <nav className=" flex flex-col gap-2 py-2 px-2">
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
