"use client";

import { useReservationStore } from "@/hooks/useReservationStore";
import ReservationDetail from "./ReservationDetail";
import ReservationDates from "./ReservationDates";
import ReservationTimes from "./ReservationTimes";

function ReservationStepOne() {
  const { selectedDate, selectedTime, handleStep } = useReservationStore();

  return (
    <>
      <ReservationDetail />
      <ReservationDates />
      <ReservationTimes />
      <button
        className=" text-neutral-50 text-base font-bold leading-[1.125rem] py-3 px-6 mt-8 w-full rounded-xl bg-purple-400 hover:bg-purple-500 duration-300 disabled:bg-neutral-400"
        disabled={!selectedDate || !selectedTime}
        onClick={() => handleStep(2)}
      >
        تایید
      </button>
    </>
  );
}

export default ReservationStepOne;
