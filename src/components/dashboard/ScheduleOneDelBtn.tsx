"use client";

import { deleteHour } from "@/lib/actions";
import { useTransition } from "react";
import { Trash2 } from "lucide-react";

function ScheduleOneDelBtn({ id, hour }: { id: string; hour: string }) {
  const [isPendingDel, startTransitionDel] = useTransition();

  function handleDelete() {
    startTransitionDel(async () => {
      await deleteHour(id, hour);
    });
  }

  return (
    <button
      type="button"
      aria-label="حذف این ساعت"
      title="حذف این ساعت"
      className="icon-btn size-9 bg-danger-tint text-danger-deep hover:bg-danger hover:text-white"
      onClick={handleDelete}
      disabled={isPendingDel}
    >
      {isPendingDel ? (
        <span className="spinner size-4 border-2" />
      ) : (
        <Trash2 className="size-4" aria-hidden />
      )}
    </button>
  );
}

export default ScheduleOneDelBtn;
