"use client";

import Modal from "@/components/ui/Modal";
import ReservationForm from "./ReservationForm";
import ReservationStepOne from "./ReservationStepOne";
import { useReservationStore } from "@/hooks/useReservationStore";
import { phoneNumberValidator } from "@persian-tools/persian-tools";

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
    hide,
  } = useReservationStore();

  function handleSubmit() {
    resetErrors();
    if (!phoneNumberValidator(phone)) {
      handleAddError(
        "شماره همراه وارد شده نامعتبر است. شماره باید با ۰۹ شروع شود."
      );
      return;
    }

    // Send data to the server
    console.log(plan);
    console.log(fullName);
    console.log(phone);
    console.log(description);
    console.log(selectedDate);
    console.log(selectedTime);

    hide();
    resetAll();
  }

  return (
    <Modal homeHref="/services">
      {step === 1 && <ReservationStepOne plan={plan} />}
      {step === 2 && (
        <>
          <p className=" text-neutral-700 text-xl font-semibold leading-7 mx-44">
            لطفا اطلاعات مورد نیاز را برای ارتباط بهتر وارد کنید.
          </p>
          <ReservationForm onSubmit={handleSubmit} />
        </>
      )}
    </Modal>
  );
}

export default Reservation;
