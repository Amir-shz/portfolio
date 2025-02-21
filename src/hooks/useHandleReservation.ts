import { createReservation } from "@/lib/actions";
import { phoneNumberValidator } from "@persian-tools/persian-tools";
import { useReservationStore } from "./useReservationStore";

function useHandleReservation() {
  const {
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
  } = useReservationStore();

  async function handleSubmit() {
    resetErrors();
    if (!phoneNumberValidator(phone)) {
      handleAddError(
        "شماره همراه وارد شده نامعتبر است. شماره باید با ۰۹ شروع شود."
      );
      return;
    }

    try {
      const result = await createReservation({
        plan,
        fullName,
        phone,
        description,
        selectedDate,
        selectedTime,
      });

      if (result) {
        return { message: result };
      }

      resetAll();
      handleStep(3);
    } catch (err) {
      console.log(err);
    }
  }
  return handleSubmit;
}

export default useHandleReservation;
