"use client";

import { useReservationStore } from "@/hooks/useReservationStore";
import ReservationStepOne from "./ReservationStepOne";
import ReservationForm from "./ReservationForm";
import ReservationStepThree from "./ReservationStepThree";
import ReservationStepFour from "./ReservationStepFour";

// The four booking steps, shared by the desktop dialog and the phone page.
function ReservationFlow() {
  const { step } = useReservationStore();

  return (
    <>
      {step === 1 && <ReservationStepOne />}
      {step === 2 && <ReservationForm />}
      {step === 3 && <ReservationStepThree />}
      {step === 4 && <ReservationStepFour />}
    </>
  );
}

export default ReservationFlow;
