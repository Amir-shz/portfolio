"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "@/app/favicon.ico";
import { ToastAction } from "./toast";
import { useToast } from "@/hooks/use-toast";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function PWAInstallPrompt() {
  const [promptEvent, setPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      const installEvent = event as BeforeInstallPromptEvent;
      setPromptEvent(installEvent);
      // نمایش اعلان بعد از 0.5 ثانیه
      setTimeout(() => setShowPrompt(true), 500);
      // بستن خودکار اعلان بعد از 5 ثانیه
      setTimeout(() => setShowPrompt(false), 5500);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  useEffect(() => {
    async function handleInstall() {
      if (promptEvent) {
        promptEvent.prompt();
        const choiceResult = await promptEvent.userChoice;
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setShowPrompt(false);
      }
    }
    if (showPrompt) {
      setTimeout(() => {
        toast({
          title: "",
          description: (
            <div className="flex items-center justify-between w-full ">
              <div className="flex items-center gap-3">
                <Image
                  src={logo}
                  alt="App Logo"
                  className=" size-10 rounded-md"
                />
                <span className="text-sm font-medium text-neutral-700">
                  برای نصب اپلیکیشن روی install کلیک کنید
                </span>
              </div>
            </div>
          ),
          action: (
            <ToastAction
              altText="install"
              className="bg-purple-300  text-white px-3 py-0.5 rounded-sm font-sans flex justify-center items-center leading-6 "
              onClick={handleInstall}
              style={{ marginLeft: "-2px", marginRight: "4px" }}
            >
              install
            </ToastAction>
          ),
          duration: 8000,
          style: {
            padding: "8px",
            backgroundColor: "#fafafa",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px 0px rgba(17,17,17,0.1)",
          },
        });
      }, 100);
    }
  }, [toast, showPrompt, promptEvent]);

  return null;
}

export default PWAInstallPrompt;

{
  /* <div
style={{
  position: "fixed",
  top: `${4}px`,
  left: `${15}px`,
  right: `${15}px`,
}}
className="bg-neutral-50  rounded-lg shadow-shadow2 flex items-center justify-between border py-2 px-2"
>
<div className="flex items-center gap-3">
  <Image src={logo} alt="App Logo" className=" size-10 rounded-md" />
  <span className="text-sm font-medium text-neutral-700">
    برای نصب اپلیکیشن روی install کلیک کنید
  </span>
</div>
<button
  onClick={handleInstall}
  className="bg-purple-300 text-purple-50 px-3 py-0.5 rounded-sm font-sans flex justify-center items-center ml-1"
>
  install
</button>
</div> */
}
