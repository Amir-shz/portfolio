"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "@/../public/promptlogo.jpg";
import { ToastAction } from "./toast";
import { useToast } from "@/hooks/use-toast";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const PWAInstallPrompt = () => {
  const [promptEvent, setPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const { toast } = useToast();

  // بررسی اینکه آیا اپلیکیشن نصب شده است یا نه
  const isAppInstalled = () => {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window.navigator as any).standalone
    );
  };

  useEffect(() => {
    if (isAppInstalled() || sessionStorage.getItem("pwa-prompt-shown")) return;

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      console.log("App installed successfully");
      setPromptEvent(null);
      sessionStorage.setItem("pwa-installed", "true");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!promptEvent) return;
    promptEvent.prompt();
    const choiceResult = await promptEvent.userChoice;
    setPromptEvent(null);
    sessionStorage.setItem("pwa-prompt-shown", "true");
    console.log(
      choiceResult.outcome === "accepted"
        ? "User accepted the install prompt"
        : "User dismissed the install prompt"
    );
  };

  useEffect(() => {
    if (!promptEvent || sessionStorage.getItem("pwa-prompt-shown")) return;

    sessionStorage.setItem("pwa-prompt-shown", "true"); // جلوگیری از نمایش مجدد در همان session

    toast({
      title: "",
      description: (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Image src={logo} alt="" className="size-10 rounded-xl" />
            <span className="text-sm font-semibold leading-6 text-ink">
              اپلیکیشن را روی دستگاهتان نصب کنید
            </span>
          </div>
        </div>
      ),
      action: (
        <ToastAction altText="نصب اپلیکیشن" onClick={handleInstall}>
          نصب
        </ToastAction>
      ),
      duration: 8000,
    });
  }, [toast, promptEvent]);

  return null;
};

export default PWAInstallPrompt;
