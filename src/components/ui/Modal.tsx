"use client";

import { createPortal } from "react-dom";
import { ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useReservationStore } from "@/hooks/useReservationStore";
import ReservationStepper from "@/features/reservation/ReservationStepper";

// Desktop booking dialog: a frosted sheet over the page.
const Modal = ({ children }: { children: ReactNode }) => {
  const { resetAll, hide } = useReservationStore();
  const panelRef = useRef<HTMLDivElement>(null);

  function close() {
    hide();
    resetAll();
  }

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        hide();
        resetAll();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      previous?.focus();
    };
  }, [hide, resetAll]);

  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div aria-hidden className="absolute inset-0 bg-plum/25 backdrop-blur-sm" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-title"
        tabIndex={-1}
        className="glass-strong relative flex max-h-[calc(100dvh-2rem)] w-full max-w-[42rem] flex-col overflow-hidden rounded-[1.5rem] outline-none animate-in fade-in-0 zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between gap-4 border-b border-ink/[0.06] px-6 pb-4 pt-5">
          <h2 id="reservation-title" className="text-base font-bold text-ink">
            رزرو نوبت
          </h2>
          <button
            type="button"
            aria-label="بستن"
            onClick={close}
            className="icon-btn size-8 bg-white/70 text-ink-soft hover:bg-white hover:text-ink"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
        <div className="overflow-y-auto px-6 pb-6 pt-5">
          <ReservationStepper className="mb-5" />
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
