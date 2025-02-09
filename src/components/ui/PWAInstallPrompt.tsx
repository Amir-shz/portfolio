"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "@/app/favicon.ico";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function PWAInstallPrompt() {
  const [promptEvent, setPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      const installEvent = event as BeforeInstallPromptEvent;
      setPromptEvent(installEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = async () => {
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
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white p-4 shadow-lg rounded-lg flex items-center justify-between border border-gray-300">
      <div className="flex items-center gap-3">
        <Image src={logo} alt="App Logo" className="w-10 h-10" />
        <span className="text-lg font-semibold">نصب اپلیکیشن</span>
      </div>
      <button
        onClick={handleInstall}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        نصب
      </button>
    </div>
  );
}

export default PWAInstallPrompt;
