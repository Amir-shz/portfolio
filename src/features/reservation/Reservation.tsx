"use client";

import Modal from "@/components/ui/Modal";
import ReservationForm from "./ReservationForm";
import ReservationStepOne from "./ReservationStepOne";
import { useReservationStore } from "@/hooks/useReservationStore";
import { phoneNumberValidator } from "@persian-tools/persian-tools";
import { createReservation } from "@/lib/actions";
import ReservationStepThree from "./ReservationStepThree";

function Reservation() {
  const {
    step,
    selectedDate,
    selectedTime,
    phone,
    fullName,
    description,
    plan,
    handleAddError,
    resetErrors,
    resetAll,
    handleStep,
    // hide,
  } = useReservationStore();

  async function handleSubmit() {
    resetErrors();
    if (!phoneNumberValidator(phone)) {
      handleAddError(
        "شماره همراه وارد شده نامعتبر است. شماره باید با ۰۹ شروع شود."
      );
      return;
    }

    await createReservation({
      plan,
      fullName,
      phone,
      description,
      selectedDate,
      selectedTime,
    });

    // hide();
    resetAll();
    handleStep(3);
  }

  return (
    <Modal homeHref="/services">
      {step === 1 && <ReservationStepOne />}
      {step === 2 && (
        <>
          <p className=" text-neutral-700 text-xl font-semibold leading-7 mx-44">
            لطفا اطلاعات مورد نیاز را برای ارتباط بهتر وارد کنید.
          </p>
          <ReservationForm onSubmit={handleSubmit} />
        </>
      )}
      {step === 3 && <ReservationStepThree />}
    </Modal>
  );
}

export default Reservation;
