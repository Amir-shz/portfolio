"use client";

import { reserveHour } from "@/lib/actions";
import { useTransition } from "react";
import { HiOutlineCheckCircle } from "react-icons/hi2";

function ScheduleReserveBtn({ id, hour }: { id: string; hour: string }) {
  const [isPendingReserve, startTransitionReserve] = useTransition();

  function handleReserve() {
    startTransitionReserve(async () => {
      await reserveHour(id, hour);
    });
  }

  return (
    <button
      className=" p-2  bg-green-500 rounded-full hover:bg-green-700 duration-300"
      onClick={handleReserve}
      disabled={isPendingReserve}
    >
      {isPendingReserve && <div className="loaderSpinner size-6"></div>}
      {!isPendingReserve && (
        <HiOutlineCheckCircle size={24} className=" stroke-2 text-neutral-50" />
      )}
    </button>
  );
}

export default ScheduleReserveBtn;
