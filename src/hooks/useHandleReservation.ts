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
      await createReservation({
        plan,
        fullName,
        phone,
        description,
        selectedDate,
        selectedTime,
      });

      resetAll();
      handleStep(3);
    } catch (err) {
      if (err instanceof Error) {
        return { message: err.message };
      } else {
        return { message: "An unknown error occurred" };
      }
    }
  }
  return handleSubmit;
}

export default useHandleReservation;
