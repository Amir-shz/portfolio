"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Eye, EyeOff, Pencil, Send, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/system/ConfirmDialog";
import { deletePost, setPostStatus } from "@/lib/blogActions";
import { useToast } from "@/hooks/use-toast";
import type { PostStatus } from "@/lib/blog/types";

function PostRowActions({
  id,
  slug,
  title,
  status,
}: {
  id: string;
  slug: string;
  title: string;
  status: PostStatus;
}) {
  const [confirm, setConfirm] = useState(false);
  const [pendingStatus, startStatus] = useTransition();
  const [pendingDelete, startDelete] = useTransition();
  const { toast } = useToast();
  const published = status === "published";

  function toggleStatus() {
    startStatus(async () => {
      const res = await setPostStatus(id, published ? "draft" : "published");
      if (!res.ok) toast({ variant: "destructive", description: res.error });
      else
        toast({
          description: published ? "نوشته به پیش‌نویس برگشت." : "نوشته منتشر شد.",
        });
    });
  }

  function remove() {
    setConfirm(false);
    startDelete(async () => {
      const res = await deletePost(id);
      if (!res.ok) toast({ variant: "destructive", description: res.error });
      else toast({ description: "نوشته حذف شد." });
    });
  }

  return (
    <div className="flex items-center gap-1">
      <Link
        href={`/dashboard/blog/${id}/edit`}
        aria-label={`ویرایش «${title}»`}
        title="ویرایش"
        className="icon-btn size-8 bg-iris-wash text-iris hover:bg-iris hover:text-white"
      >
        <Pencil className="size-3.5" aria-hidden />
      </Link>
      <a
        href={published ? `/blog/${encodeURIComponent(slug)}` : `/blog/preview/${id}`}
        target="_blank"
        rel="noreferrer"
        aria-label={published ? "مشاهده در سایت" : "پیش‌نمایش"}
        title={published ? "مشاهده در سایت" : "پیش‌نمایش"}
        className="icon-btn size-8 bg-white/70 text-ink-soft hover:bg-white hover:text-ink"
      >
        <Eye className="size-3.5" aria-hidden />
      </a>
      <button
        type="button"
        onClick={toggleStatus}
        disabled={pendingStatus}
        aria-label={published ? "برگرداندن به پیش‌نویس" : "انتشار"}
        title={published ? "برگرداندن به پیش‌نویس" : "انتشار"}
        className={
          published
            ? "icon-btn size-8 bg-warn-tint text-warn-deep hover:bg-warn hover:text-white"
            : "icon-btn size-8 bg-ok-tint text-ok-deep hover:bg-ok hover:text-white"
        }
      >
        {pendingStatus ? (
          <span className="spinner size-3.5 border-2" />
        ) : published ? (
          <EyeOff className="size-3.5" aria-hidden />
        ) : (
          <Send className="size-3.5 -scale-x-100" aria-hidden />
        )}
      </button>
      <button
        type="button"
        onClick={() => setConfirm(true)}
        disabled={pendingDelete}
        aria-label={`حذف «${title}»`}
        title="حذف"
        className="icon-btn size-8 bg-danger-tint text-danger-deep hover:bg-danger hover:text-white"
      >
        {pendingDelete ? <span className="spinner size-3.5 border-2" /> : <Trash2 className="size-3.5" aria-hidden />}
      </button>
      <ConfirmDialog
        open={confirm}
        onOpenChange={setConfirm}
        title={`نوشته «${title}» حذف شود؟`}
        description="نوشته از سایت و پنل حذف می‌شود و قابل بازگشت نیست."
        confirmLabel="حذف نوشته"
        onConfirm={remove}
      />
    </div>
  );
}

export default PostRowActions;
