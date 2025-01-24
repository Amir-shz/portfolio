"use client";

import { HiOutlineCheckCircle, HiOutlineTrash } from "react-icons/hi2";
import { deleteReservation, finishReservationStatus } from "@/lib/actions";
import { useTransition } from "react";

function ReservationRowBtns({ id, status }: { id: string; status: string }) {
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
        className=" p-2  bg-red-500 rounded-full hover:bg-red-700 duration-300"
        onClick={handleDelete}
        disabled={isPendingDel}
      >
        {isPendingDel && <div className="loaderSpinner size-6"></div>}
        {!isPendingDel && (
          <HiOutlineTrash size={24} className=" stroke-2 text-neutral-50" />
        )}
      </button>
      <button
        className=" p-2  bg-success-500 rounded-full hover:bg-success-700 duration-300 disabled:bg-neutral-500"
        disabled={status === "finish" || isPendingFin}
        onClick={handleChangeStatus}
      >
        {isPendingFin && <div className="loaderSpinner size-6"></div>}
        {!isPendingFin && (
          <HiOutlineCheckCircle
            size={24}
            className=" stroke-2 text-neutral-50"
          />
        )}
      </button>
    </>
  );
}

export default ReservationRowBtns;
