import { useReservationStore } from "@/hooks/useReservationStore";
import { HiCheckBadge } from "react-icons/hi2";

function ReservationStepThree() {
  const { hide, handleStep } = useReservationStore();

  return (
    <div className=" flex flex-col justify-center items-center">
      <HiCheckBadge size={64} className=" text-success-500 mb-4" />
      <p className=" font-semibold text-lg text-neutral-600">
        نوبت شما با موفقیت رزرو شد. با شما تماس گرفته خواهد شد
      </p>
      <button
        className=" text-neutral-50 text-base font-bold leading-[1.125rem] py-3 px-6 mt-8 w-full rounded-xl bg-purple-400 hover:bg-purple-500 duration-300 disabled:bg-neutral-400"
        onClick={() => {
          hide();
          handleStep(1);
        }}
      >
        تایید
      </button>
    </div>
  );
}

export default ReservationStepThree;
