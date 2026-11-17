"use client";

import { TriangleAlert } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// The one confirmation step used before anything is deleted.
function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "حذف کردن",
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent hideClose>
        <span className="grid size-12 place-items-center rounded-xl bg-danger-tint text-danger">
          <TriangleAlert className="size-6" aria-hidden />
        </span>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description ?? "این کار قابل بازگشت نیست."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-2">
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            {confirmLabel}
          </button>
          <DialogClose className="btn btn-glass">انصراف</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDialog;
