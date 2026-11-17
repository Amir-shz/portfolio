"use client";

import { reserveHour } from "@/lib/actions";
import { useTransition } from "react";
import { CircleCheck } from "lucide-react";

function ScheduleReserveBtn({ id, hour }: { id: string; hour: string }) {
  const [isPendingReserve, startTransitionReserve] = useTransition();

  function handleReserve() {
    startTransitionReserve(async () => {
      await reserveHour(id, hour);
    });
  }

  return (
    <button
      type="button"
      aria-label="علامت‌گذاری به‌عنوان رزرو شده"
      title="علامت‌گذاری به‌عنوان رزرو شده"
      className="icon-btn size-9 bg-ok-tint text-ok-deep hover:bg-ok hover:text-white"
      onClick={handleReserve}
      disabled={isPendingReserve}
    >
      {isPendingReserve ? (
        <span className="spinner size-4 border-2" />
      ) : (
        <CircleCheck className="size-4" aria-hidden />
      )}
    </button>
  );
}

export default ScheduleReserveBtn;
