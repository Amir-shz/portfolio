"use client";

import { deleteHour } from "@/lib/actions";
import { useTransition } from "react";
import { HiOutlineTrash } from "react-icons/hi2";

function ScheduleOneDelBtn({ id, hour }: { id: string; hour: string }) {
  const [isPendingDel, startTransitionDel] = useTransition();

  function handleDelete() {
    startTransitionDel(async () => {
      await deleteHour(id, hour);
    });
  }

  return (
    <button
      className=" p-2  bg-red-500 rounded-full hover:bg-red-700 duration-300"
      onClick={handleDelete}
      disabled={isPendingDel}
    >
      {isPendingDel && <div className="loaderSpinner size-6"></div>}
      {!isPendingDel && (
        <HiOutlineTrash size={24} className=" stroke-2 text-neutral-50" />
      )}
    </button>
  );
}

export default ScheduleOneDelBtn;
