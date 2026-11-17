"use client";

import { ArrowLeft } from "lucide-react";
import { useReservationStore } from "@/hooks/useReservationStore";
import ReservationDetail from "./ReservationDetail";
import ReservationDates from "./ReservationDates";
import ReservationTimes from "./ReservationTimes";
import StepActions from "./StepActions";

function ReservationStepOne() {
  const { selectedDate, selectedTime, handleStep } = useReservationStore();

  return (
    <div className="flex flex-1 flex-col">
      <div className="grid gap-6">
        <ReservationDetail />
        <ReservationDates />
        <ReservationTimes />
      </div>
      <StepActions>
        <button
          type="button"
          className="btn btn-primary w-full"
          disabled={!selectedDate || !selectedTime}
          onClick={() => handleStep(2)}
        >
          ادامه
          <ArrowLeft className="size-4" aria-hidden />
        </button>
      </StepActions>
    </div>
  );
}

export default ReservationStepOne;
