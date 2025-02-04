"use client";

import { HiOutlineCheckCircle, HiOutlineTrash } from "react-icons/hi2";
import { deleteReservation, finishReservationStatus } from "@/lib/actions";
import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";

function ReservationRowBtns({ id, status }: { id: string; status: string }) {
  const [isPendingDel, startTransitionDel] = useTransition();
  const [isPendingFin, startTransitionFin] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  function handleDelete() {
    setShowConfirm(() => false);
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
        onClick={() => setShowConfirm(true)}
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
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-neutral-50/[0.01] backdrop-blur-sm dialog__overlay">
            <DialogContent className="[&>button]:hidden max-sm:w-3/4 max-sm:rounded-md backdrop-blur-sm">
              <DialogTitle className=" text-center">
                از حذف این رزرو مطمئن هستید؟
              </DialogTitle>
              <div className="flex gap-4 mt-4">
                <button
                  className="bg-error-700 text-neutral-50 font-medium py-2 px-4 rounded-lg"
                  onClick={handleDelete}
                >
                  حذف کردن
                </button>
                <button
                  className=" font-medium py-2 px-4"
                  onClick={() => setShowConfirm(false)}
                >
                  بازگشت
                </button>
              </div>
            </DialogContent>
          </DialogOverlay>
        </DialogPortal>
      </Dialog>
    </>
  );
}

export default ReservationRowBtns;
