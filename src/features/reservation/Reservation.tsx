"use client";

import Modal from "@/components/ui/Modal";
import ReservationForm from "./ReservationForm";
import ReservationStepOne from "./ReservationStepOne";
import { useReservationStore } from "@/hooks/useReservationStore";
import ReservationStepThree from "./ReservationStepThree";

function Reservation() {
  const { step } = useReservationStore();

  return (
    <Modal homeHref="/services">
      {step === 1 && <ReservationStepOne />}
      {step === 2 && (
        <>
          <p className=" text-neutral-700 text-xl font-semibold leading-7 mx-44">
            لطفا اطلاعات مورد نیاز را برای ارتباط بهتر وارد کنید.
          </p>
          <ReservationForm />
        </>
      )}
      {step === 3 && <ReservationStepThree />}
    </Modal>
  );
}

export default Reservation;
