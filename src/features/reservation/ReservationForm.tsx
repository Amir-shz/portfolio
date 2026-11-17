"use client";

import useHandleReservation from "@/hooks/useHandleReservation";
import { useReservationStore } from "@/hooks/useReservationStore";
import { useRef, useState, useTransition } from "react";
import { CircleAlert } from "lucide-react";
import { Field, TextAreaField } from "@/components/system/Field";
import StepActions from "./StepActions";

function ReservationForm() {
  const [error, setError] = useState("");

  // REF FOR CHAGING FOCUS WITH ENTER
  const secondInputRef = useRef<HTMLInputElement>(null);
  const thirdInputRef = useRef<HTMLTextAreaElement>(null);

  // HANDLE FORM LOGIC (custom hook)
  const handleReservation = useHandleReservation();

  // TRANSITION FOR LOADING OR PENDING STATE
  const [isPending, startTransition] = useTransition();

  const {
    fullName,
    handleFullNameChange,
    phone,
    handlePhoneChange,
    description,
    handleDescriptionChange,
    errors,
  } = useReservationStore();

  const handleForm = () => {
    startTransition(async () => {
      const reservationError = await handleReservation();
      if (reservationError) setError(reservationError?.message);

      setTimeout(() => {
        setError("");
      }, 5000);
    });
  };

  const messages = [...errors, ...(error ? [error] : [])];

  return (
    <form
      className="flex flex-1 flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        if (fullName && phone && !isPending) handleForm();
      }}
    >
      <p className="text-sm leading-7 text-ink-soft">
        لطفا اطلاعات مورد نیاز را برای ارتباط بهتر وارد کنید.
      </p>

      <div className="mt-4 grid gap-3">
        <Field
          label="نام و نام‌خانوادگی"
          name="fullName"
          autoComplete="name"
          required
          value={fullName}
          onChange={handleFullNameChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              secondInputRef.current?.focus();
            }
          }}
        />
        <Field
          ref={secondInputRef}
          label="شماره همراه"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          dir="ltr"
          className="text-right"
          required
          value={phone}
          onChange={handlePhoneChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              thirdInputRef.current?.focus();
            }
          }}
        />
        <TextAreaField
          ref={thirdInputRef}
          label="توضیحات (اختیاری)"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />

        {messages.length > 0 && (
          <div
            role="alert"
            className="flex gap-3 rounded-xl border border-danger/20 bg-danger-tint px-3.5 py-2.5 text-[0.8125rem] font-medium leading-6 text-danger-deep"
          >
            <CircleAlert className="mt-1 size-4 shrink-0" aria-hidden />
            <div>
              {messages.map((el, index) => (
                <p key={index}>{el}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      <StepActions>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={!fullName || !phone || isPending}
        >
          {isPending ? <span className="loaderDotMiniWhite my-2" /> : "ثبت و ادامه"}
        </button>
      </StepActions>
    </form>
  );
}

export default ReservationForm;
