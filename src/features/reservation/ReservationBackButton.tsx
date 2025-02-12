"use client";

import { useReservationStore } from "@/hooks/useReservationStore";
import { useRouter } from "next/navigation";
import { HiMiniArrowRight } from "react-icons/hi2";

function ReservationBackButton() {
  const { step, handleStep, resetAll } = useReservationStore();
  const router = useRouter();
  // const pathName = usePathname();

  function handleBack() {
    if (step === 1) {
      router.push("/services");
      setTimeout(() => {
        resetAll();
      }, 200);
      // resetAll();
    }
    if (step === 2) {
      handleStep(1);
      resetAll();
    }
    if (step === 3) {
      router.push("/services");
      setTimeout(() => {
        resetAll();
      }, 200);
      // resetAll();
    }
  }

  return (
    <button
      aria-label="back button"
      className="p-2 bg-neutral-50 rounded-full hover:bg-neutral-100 duration-200 z-20 "
      onClick={handleBack}
    >
      <HiMiniArrowRight size={24} className="text-purple-500" />
    </button>
  );
}

export default ReservationBackButton;
