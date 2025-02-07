"use client";

import { useReservationStore } from "@/hooks/useReservationStore";
import ReservationDetail from "./ReservationDetail";
import ReservationDates from "./ReservationDates";
import ReservationTimes from "./ReservationTimes";

function ReservationStepOne() {
  const { selectedDate, selectedTime, handleStep } = useReservationStore();

  return (
    <div className="max-sm:flex max-sm:flex-col max-sm:justify-between max-sm:h-[calc(100dvh-80px)]">
      <div>
        <ReservationDetail />
        <ReservationDates />
        <ReservationTimes />
      </div>
      <button
        className=" text-neutral-50 text-base font-bold leading-[1.125rem] py-3 px-6 mt-8 w-full rounded-xl bg-purple-400 hover:bg-purple-500 duration-300 disabled:bg-neutral-400 max-sm:py-[0.625rem]  max-sm:mb-2 "
        disabled={!selectedDate || !selectedTime}
        onClick={() => handleStep(2)}
      >
        تایید
      </button>
    </div>
  );
}

export default ReservationStepOne;
