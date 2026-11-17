"use client";

import { CircleCheck, Trash2 } from "lucide-react";
import { deleteReservation, finishReservationStatus } from "@/lib/actions";
import { useState, useTransition } from "react";
import ConfirmDialog from "@/components/system/ConfirmDialog";
import { cn } from "@/lib/utils";

// "Finish" and "delete" for one reservation. Icon-only in tables, with
// labels on the detail page.
function ReservationRowBtns({
  id,
  status,
  withLabels = false,
}: {
  id: string;
  status: string;
  withLabels?: boolean;
}) {
  const [isPendingDel, startTransitionDel] = useTransition();
  const [isPendingFin, startTransitionFin] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);
  const finished = status === "finish";

  function handleDelete() {
    setShowConfirm(false);
    startTransitionDel(async () => {
      await deleteReservation(id);
    });
  }

  function handleChangeStatus() {
    startTransitionFin(async () => {
      await finishReservationStatus(id);
    });
  }

  const base = withLabels ? "btn btn-sm" : "icon-btn size-8";

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        title={finished ? "این جلسه تمام شده است" : "اتمام جلسه"}
        aria-label={withLabels ? undefined : "اتمام جلسه"}
        className={cn(base, "bg-ok-tint text-ok-deep hover:bg-ok hover:text-white")}
        disabled={finished || isPendingFin}
        onClick={handleChangeStatus}
      >
        {isPendingFin ? (
          <span className="spinner size-4 border-2" />
        ) : (
          <CircleCheck className="size-4" aria-hidden />
        )}
        {withLabels && (finished ? "تمام شده" : "اتمام جلسه")}
      </button>
      <button
        type="button"
        title="حذف رزرو"
        aria-label={withLabels ? undefined : "حذف رزرو"}
        className={cn(base, "bg-danger-tint text-danger-deep hover:bg-danger hover:text-white")}
        onClick={() => setShowConfirm(true)}
        disabled={isPendingDel}
      >
        {isPendingDel ? (
          <span className="spinner size-4 border-2" />
        ) : (
          <Trash2 className="size-4" aria-hidden />
        )}
        {withLabels && "حذف رزرو"}
      </button>
      <ConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        title="از حذف این رزرو مطمئن هستید؟"
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default ReservationRowBtns;
