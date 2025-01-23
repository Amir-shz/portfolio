import { useReservationStore } from "@/hooks/useReservationStore";
import { useRef } from "react";

function ReservationForm({ onSubmit }: { onSubmit: () => void }) {
  const secondInputRef = useRef<HTMLInputElement>(null);
  const thirdInputRef = useRef<HTMLTextAreaElement>(null);

  const {
    fullName,
    phone,
    description,
    errors,
    handleFullNameChange,
    handlePhoneChange,
    handleDescriptionChange,
  } = useReservationStore();

  return (
    <form>
      <div className="reservationForm">
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
        className={` ${
          errors.length > 0 ? "mt-8" : "mt-[4.5rem]"
        }  text-neutral-50 text-base font-bold leading-[1.125rem] py-3 px-6 w-full rounded-xl bg-purple-400 hover:bg-purple-500 duration-300 disabled:bg-neutral-400`}
        disabled={!fullName || !phone}
        onClick={onSubmit}
      >
        تایید
      </button>
    </form>
  );
}

export default ReservationForm;
