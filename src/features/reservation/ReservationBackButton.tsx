"use client";

import { useReservationStore } from "@/hooks/useReservationStore";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

function ReservationBackButton() {
  const { step, handleStep, resetAll } = useReservationStore();
  const router = useRouter();

  function handleBack() {
    if (step === 1) {
      router.push("/services");
      setTimeout(() => {
        resetAll();
      }, 200);
    }
    if (step === 2) {
      handleStep(1);
      resetAll();
    }
    if (step === 3) {
      handleStep(2);
    }
    if (step === 4) {
      handleStep(3);
    }
  }

  return (
    <button
      type="button"
      aria-label="بازگشت"
      className="icon-btn size-9 bg-white/80 text-iris hover:bg-white"
      onClick={handleBack}
    >
      <ArrowRight className="size-4" aria-hidden />
    </button>
  );
}

export default ReservationBackButton;
