"use client";

import ClockIcon from "../icons/ClockIcon";
import DollarIcon from "../icons/DollarIcon";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import { planCardProps } from "@/types/types";
import { useReservationStore } from "@/hooks/useReservationStore";

function PlanCard({
  title,
  time,
  price = "free",
  id,
}: planCardProps): React.ReactNode {
  const { show, setPlan } = useReservationStore();
  return (
    <div className=" rounded-3xl border border-neutral-300 shadow-shadow3 bg-neutral-100 hover:border-purple-200 transition-all duration-300">
      <p className=" text-neutral-700 font-semibold leading-5 text-lg pr-6 py-6">
        {title}
      </p>
      <div className=" flex gap-1 mb-3 items-center pr-6 h-7">
        <ClockIcon />
        <p className=" text-neutral-500 text-base font-semibold leading-4">
          {time}
        </p>
      </div>
      <div className=" flex gap-1 mb-5 items-center pr-6 h-7">
        <DollarIcon />
        <p className=" text-neutral-500 text-base font-semibold leading-4">
          {price === "free" ? "رایگان" : price}
          {price !== "free" && (
            <span className=" text-neutral-400 text-xs font-semibold">
              {" "}
              تومان
            </span>
          )}
        </p>
      </div>
      <div className=" w-full px-6">
        <button
          className=" w-full rounded-xl shadow-shadow4 bg-purple-400 mb-[1.63rem] hover:bg-purple-500 hover:shadow-shadow4 transition-all duration-300"
          onClick={() => {
            setPlan(id);
            show();
          }}
        >
          <div className="flex gap-2 items-center justify-center py-3 px-6">
            <p className=" text-neutral-50 font-bold text-base leading-[1.125rem]">
              رزرو کردن
            </p>
            <ArrowLeftIcon />
          </div>
        </button>
      </div>
    </div>
  );
}

export default PlanCard;
