"use client";

import useHandleReservation from "@/hooks/useHandleReservation";
import { useReservationStore } from "@/hooks/useReservationStore";
import { useRef, useTransition } from "react";

function ReservationForm() {
  // REF FOR CHAGING FOCUS WITH ENTER
  const secondInputRef = useRef<HTMLInputElement>(null);
  const thirdInputRef = useRef<HTMLTextAreaElement>(null);

  // HANDLE FORM LOGIC (custom hook)
  const handleReservation = useHandleReservation();

  // TRANSITION FOR LOADING OR PENDING STATE
  const [isPending, startTransition] = useTransition();

  const {
    // FULL NAME INPUT
    fullName,
    handleFullNameChange,
    // PHONE INPUT
    phone,
    handlePhoneChange,
    // DESCRIPTION INPUT
    description,
    handleDescriptionChange,
    // ERRORS FOR SHOW TO CLIENT
    errors,
  } = useReservationStore();

  const handleForm = () => {
    startTransition(() => {
      handleReservation();
    });
  };

  return (
    <div className=" max-sm:flex max-sm:flex-col max-sm:justify-between max-sm:h-[calc(100dvh-128px)]">
      <div className="reservationForm max-sm:mt-4 max-sm:gap-6">
        <label className=" relative w-full">
          <input
            type="text"
            className=" w-full notShown"
            placeholder=""
            required
            value={fullName}
            onChange={handleFullNameChange}
            onKeyDown={(e) =>
              e.key === "Enter" && secondInputRef.current?.focus()
            }
          />
          <p className="reservationParagraph top-1/2">نام و نام‌خانوادگی</p>
        </label>

        <label className=" relative w-full">
          <input
            type="text"
            className=" w-full notShown"
            ref={secondInputRef}
            placeholder=""
            required
            value={phone}
            onChange={handlePhoneChange}
            onKeyDown={(e) =>
              e.key === "Enter" && thirdInputRef.current?.focus()
            }
          />
          <p className="reservationParagraph top-1/2">شماره همراه</p>
        </label>

        <label className=" relative w-full">
          <textarea
            className=" w-full h-40 notShown border border-neutral-400 py-3 px-3 bg-neutral-50 rounded-lg
          focus:border-purple-500 focus:outline-none [&~p]:focus:top-0 [&~p]:focus:text-xs resize-none
          "
            placeholder=""
            ref={thirdInputRef}
            value={description}
            onChange={handleDescriptionChange}
          />
          <p className="reservationParagraph top-6">توضیحات (اختیاری)</p>
        </label>
      </div>
      <div className=" text-sm font-semibold text-error-700 leading-6">
        {errors.map((el, index) => (
          <p key={index}>{el}</p>
        ))}
      </div>
      <button
        className={`max-sm:py-[0.625rem]  ${
          errors.length > 0 ? "mt-8" : "mt-[4.5rem]"
        }  text-neutral-50 text-base font-bold leading-[1.125rem] py-3 px-6 w-full rounded-xl bg-purple-400 hover:bg-purple-500 duration-300  ${
          isPending ? "flex justify-center" : "disabled:bg-neutral-400 "
        }`}
        disabled={!fullName || !phone || isPending}
        onClick={handleForm}
      >
        {isPending ? (
          <div className="loaderDotMiniWhite w-full my-1 max-sm:my-[6px]"></div>
        ) : (
          "تایید"
        )}
      </button>
    </div>
  );
}

export default ReservationForm;
