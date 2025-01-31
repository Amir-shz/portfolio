"use client";

import { HiOutlineCheckCircle, HiOutlineTrash } from "react-icons/hi2";
import { deleteReservation, finishReservationStatus } from "@/lib/actions";
import { useTransition } from "react";

function DashboardTableBtns({ id, status }: { id: string; status: string }) {
  const [isPendingDel, startTransitionDel] = useTransition();
  const [isPendingFin, startTransitionFin] = useTransition();

  function handleDelete() {
    startTransitionDel(async () => {
      await deleteReservation(id);
    });
  }
  function handleChangeStatus() {
    startTransitionFin(async () => {
      await finishReservationStatus(id);
    });
  }

  return (
    <>
      <button
        className=" p-[5px]  bg-red-500 rounded-full hover:bg-red-700 duration-300 aspect-square"
        onClick={handleDelete}
        disabled={isPendingDel}
      >
        {isPendingDel && (
          <div className="loaderSpinnerMiniWhite2 size-full "></div>
        )}
        {!isPendingDel && (
          <HiOutlineTrash size={18} className=" stroke-2 text-neutral-50" />
        )}
      </button>
      <button
        className=" p-[5px]  bg-success-500 rounded-full hover:bg-success-700 duration-300 disabled:bg-neutral-500 aspect-square"
        disabled={status === "finish" || isPendingFin}
        onClick={handleChangeStatus}
      >
        {isPendingFin && (
          <div className="loaderSpinnerMiniWhite2 size-full"></div>
        )}
        {!isPendingFin && (
          <HiOutlineCheckCircle
            size={18}
            className=" stroke-2 text-neutral-50"
          />
        )}
      </button>
    </>
  );
}

export default DashboardTableBtns;
