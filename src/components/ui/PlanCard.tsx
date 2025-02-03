"use client";

import ClockIcon from "../icons/ClockIcon";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import { planCardProps } from "@/types/types";
import { useReservationStore } from "@/hooks/useReservationStore";
import { useRouter } from "next/navigation";

function PlanCard({
  title,
  time,
  price,
  description,
  points,
  id,
}: planCardProps): React.ReactNode {
  const { show, setPlan } = useReservationStore();
  const router = useRouter();

  return (
    <div className=" rounded-3xl border border-neutral-300 shadow-shadow3 bg-neutral-100 hover:border-purple-200 transition-all duration-300 flex flex-col justify-between min-h-96 last:bg-purple-300 group last:border-none select-none">
      <div>
        <p className=" group-last:text-neutral-50 text-neutral-700 font-bold leading-[1.875rem] text-[1.375rem] pt-6 text-center">
          {title}
        </p>
        <p className=" group-last:text-purple-100 pt-3 text-neutral-400 font-semibold leading-4 text-sm text-center">
          {description}
        </p>
      </div>
      <ul className=" px-[1.3rem] ">
        {points.map((point, index) => (
          <li
            key={index}
            className="group-last:text-neutral-200 text-neutral-500 text-sm font-medium leading-[1.875rem] list-inside list-disc"
          >
            {point}
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center flex-col gap-4">
        <div className="flex gap-1 items-center [&>svg>path]:group-last:stroke-neutral-200">
          <ClockIcon />
          <p className=" group-last:text-neutral-200 text-neutral-500 text-base font-semibold leading-4">
            {time}
          </p>
        </div>

        <p className="group-last:text-neutral-50 text-neutral-700 text-[1.375rem] font-bold leading-[1.875rem] text-center">
          {price === "free" ? "رایگان" : price}
        </p>

        <div className=" w-full px-6">
          {/* BUTTON FOR MOBILE SIZE (go to new page) */}
          <button
            className=" w-full rounded-xl shadow-shadow4 bg-purple-400  group-last:bg-neutral-50 mb-6 hover:bg-purple-500 hover:shadow-shadow4 transition-all duration-300 sm:hidden"
            onClick={() => {
              setPlan(id);
              router.push("/reservation");
            }}
          >
            <div className="flex gap-2 items-center justify-center py-3 px-6">
              <p className=" group-last:text-purple-400 [&~svg>path]:group-last:stroke-purple-400 text-neutral-50 font-bold text-base leading-[1.125rem]">
                رزرو کردن
              </p>
              <ArrowLeftIcon />
            </div>
          </button>

          {/* BUTTON FOR DESKTOP SIZE (open modal) */}
          <button
            className=" w-full rounded-xl shadow-shadow4 bg-purple-400  group-last:bg-neutral-50 mb-6 hover:bg-purple-500 hover:shadow-shadow4 transition-all duration-300 max-sm:hidden"
            onClick={() => {
              setPlan(id);
              show();
            }}
          >
            <div className="flex gap-2 items-center justify-center py-3 px-6">
              <p className=" group-last:text-purple-400 [&~svg>path]:group-last:stroke-purple-400 text-neutral-50 font-bold text-base leading-[1.125rem]">
                رزرو کردن
              </p>
              <ArrowLeftIcon />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlanCard;
