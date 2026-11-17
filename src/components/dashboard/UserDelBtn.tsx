"use client";
import { deleteUser } from "@/lib/actions";
import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/system/ConfirmDialog";

function UserDelBtn({ id, role }: { id: string; role: "ADMIN" | "OWNER" }) {
  const [isPendingDel, startTransitionDel] = useTransition();
  const [confirm, setConfirm] = useState(false);
  const isOwner = role === "OWNER";

  function handleDelete() {
    setConfirm(false);
    startTransitionDel(async () => {
      await deleteUser(id);
    });
  }

  return (
    <>
      <button
        type="button"
        aria-label={isOwner ? "حساب مدیر کل قابل حذف نیست" : "حذف کاربر"}
        title={isOwner ? "حساب مدیر کل قابل حذف نیست" : "حذف کاربر"}
        className="icon-btn size-9 bg-danger-tint text-danger-deep hover:bg-danger hover:text-white"
        onClick={() => setConfirm(true)}
        disabled={isPendingDel || isOwner}
      >
        {isPendingDel ? (
          <span className="spinner size-4 border-2" />
        ) : (
          <Trash2 className="size-4" aria-hidden />
        )}
      </button>
      <ConfirmDialog
        open={confirm}
        onOpenChange={setConfirm}
        title="این کاربر حذف شود؟"
        confirmLabel="حذف کاربر"
        onConfirm={handleDelete}
      />
    </>
  );
}

export default UserDelBtn;
