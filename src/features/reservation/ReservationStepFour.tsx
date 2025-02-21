import { HiCheckBadge } from "react-icons/hi2";
import { useReservationStore } from "@/hooks/useReservationStore";
import { useRouter } from "next/navigation";

function ReservationStepFour() {
  const { handleStep, hide, resetAll } = useReservationStore();

  // FOR MOBILE SIZE
  const router = useRouter();

  return (
    <div className=" flex flex-col justify-center items-center max-sm:mt-4 max-sm:justify-between max-sm:h-[calc(100dvh-92px)]">
      <div className=" flex flex-col justify-center items-center">
        <HiCheckBadge
          size={64}
          className=" text-success-500 mb-4 max-sm:size-44"
        />

        <p className=" font-semibold text-lg text-neutral-600 max-sm:text-base max-sm:text-center max-sm:w-full max-sm:mx-auto">
          {/* نوبت شما با موفقیت رزرو شد. با شما تماس گرفته خواهد شد */}
          بعد از واریز، لطفا عکس فیش یا رسیدش رو به تلگرام یا شماره تماسی که در
          قسمت ارتباط با ما هستن، ارسال کنید.
        </p>
      </div>
      <button
        className=" text-neutral-50 text-base font-bold leading-[1.125rem] py-3 px-6 mt-8 w-full rounded-xl bg-purple-400 hover:bg-purple-500 duration-300 disabled:bg-neutral-400 max-sm:hidden"
        autoFocus={true}
        onClick={() => {
          hide();
          handleStep(1);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            hide();
            handleStep(1);
          }
        }}
      >
        بسیار خوب
      </button>
      {/* MOBILE BUTTON */}
      <button
        className=" text-neutral-50 text-base font-bold leading-[1.125rem] py-3 px-6 mt-8 w-full rounded-xl bg-purple-400 hover:bg-purple-500 duration-300 disabled:bg-neutral-400 sm:hidden mb-2"
        autoFocus={true}
        onClick={() => {
          router.push("/services");
          setTimeout(() => {
            resetAll();
          }, 200);
        }}
      >
        بسیار خوب
      </button>
    </div>
  );
}

export default ReservationStepFour;
