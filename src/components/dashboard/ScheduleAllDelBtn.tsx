"use client";

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/system/ConfirmDialog";

// Lives inside the delete-schedule <form>; asks first, then submits it.
function ScheduleAllDelBtn() {
  const status = useFormStatus();
  const [confirm, setConfirm] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        disabled={status.pending}
        onClick={() => setConfirm(true)}
        className="btn btn-sm bg-danger-tint text-danger-deep hover:bg-danger hover:text-white"
      >
        {status.pending ? (
          <span className="spinner size-4 border-2" />
        ) : (
          <Trash2 className="size-4" aria-hidden />
        )}
        حذف همه ساعت‌های این روز
      </button>
      <ConfirmDialog
        open={confirm}
        onOpenChange={setConfirm}
        title="همه ساعت‌های این روز حذف شوند؟"
        confirmLabel="حذف همه"
        onConfirm={() => {
          setConfirm(false);
          btnRef.current?.form?.requestSubmit();
        }}
      />
    </>
  );
}

export default ScheduleAllDelBtn;
