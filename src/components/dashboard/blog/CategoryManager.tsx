"use client";

import { useId, useState, useTransition } from "react";
import { Check, FolderPlus, Pencil, Tags, Trash2, X } from "lucide-react";
import ConfirmDialog from "@/components/system/ConfirmDialog";
import { createCategory, deleteCategory, updateCategory } from "@/lib/blogActions";
import { useToast } from "@/hooks/use-toast";
import { faNumber } from "@/lib/blog/format";
import type { CategoryWithCount } from "@/lib/blog/types";

function Row({ category }: { category: CategoryWithCount }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(category.name);
  const [slug, setSlug] = useState(category.slug);
  const [confirm, setConfirm] = useState(false);
  const [pending, start] = useTransition();
  const { toast } = useToast();
  const nameId = useId();
  const slugId = useId();

  function save() {
    start(async () => {
      const res = await updateCategory(category.id, { name, slug, order: category.order });
      if (!res.ok) toast({ variant: "destructive", description: res.error });
      else {
        setEditing(false);
        setSlug(res.slug);
        toast({ description: "دسته ذخیره شد." });
      }
    });
  }

  function remove() {
    setConfirm(false);
    start(async () => {
      const res = await deleteCategory(category.id);
      if (!res.ok) toast({ variant: "destructive", description: res.error });
      else toast({ description: "دسته حذف شد." });
    });
  }

  return (
    <li className="flex flex-wrap items-center gap-3 rounded-xl border border-white bg-white/60 p-3">
      {editing ? (
        <form
          className="flex min-w-0 flex-1 flex-wrap items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
        >
          <div className="min-w-[10rem] flex-1">
            <label htmlFor={nameId} className="text-[0.6875rem] text-ink-faint">
              نام
            </label>
            <input id={nameId} value={name} maxLength={60} onChange={(e) => setName(e.target.value)} className="input mt-0.5 min-h-0 py-1.5 text-sm" />
          </div>
          <div className="min-w-[10rem] flex-1">
            <label htmlFor={slugId} className="text-[0.6875rem] text-ink-faint">
              نامک
            </label>
            <input id={slugId} value={slug} maxLength={80} onChange={(e) => setSlug(e.target.value)} className="input mt-0.5 min-h-0 py-1.5 text-sm" />
          </div>
          <button type="submit" disabled={pending} aria-label="ذخیره" className="icon-btn size-9 rounded-xl bg-iris text-white hover:bg-iris-deep">
            {pending ? <span className="spinner size-3.5 border-2" /> : <Check className="size-4" aria-hidden />}
          </button>
          <button
            type="button"
            aria-label="انصراف"
            onClick={() => {
              setEditing(false);
              setName(category.name);
              setSlug(category.slug);
            }}
            className="icon-btn size-9 rounded-xl bg-white/80 text-ink-soft hover:bg-white"
          >
            <X className="size-4" aria-hidden />
          </button>
        </form>
      ) : (
        <>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-ink">{category.name}</p>
            <p dir="ltr" className="truncate text-start text-[0.6875rem] text-ink-faint">
              /blog?category={category.slug}
            </p>
          </div>
          <span className="chip bg-iris-wash text-[0.75rem] text-iris-deep">
            {faNumber(category.count)} نوشته
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              aria-label={`ویرایش ${category.name}`}
              onClick={() => setEditing(true)}
              className="icon-btn size-8 bg-iris-wash text-iris hover:bg-iris hover:text-white"
            >
              <Pencil className="size-3.5" aria-hidden />
            </button>
            <button
              type="button"
              aria-label={`حذف ${category.name}`}
              title={category.count > 0 ? "این دسته در نوشته‌ها استفاده شده و قابل حذف نیست" : "حذف"}
              disabled={pending || category.count > 0}
              onClick={() => setConfirm(true)}
              className="icon-btn size-8 bg-danger-tint text-danger-deep hover:bg-danger hover:text-white"
            >
              {pending ? <span className="spinner size-3.5 border-2" /> : <Trash2 className="size-3.5" aria-hidden />}
            </button>
          </div>
        </>
      )}
      <ConfirmDialog
        open={confirm}
        onOpenChange={setConfirm}
        title={`دسته «${category.name}» حذف شود؟`}
        description={
          category.count > 0
            ? "این دسته در نوشته‌ها استفاده شده است؛ ابتدا دسته آن نوشته‌ها را تغییر دهید."
            : undefined
        }
        onConfirm={remove}
      />
    </li>
  );
}

function CategoryManager({ categories }: { categories: CategoryWithCount[] }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  const { toast } = useToast();
  const id = useId();

  function add() {
    setError("");
    start(async () => {
      const res = await createCategory({ name });
      if (!res.ok) {
        setError(res.fieldErrors?.name ?? res.error);
        return;
      }
      setName("");
      toast({ description: "دسته اضافه شد." });
    });
  }

  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[20rem_minmax(0,1fr)]">
      <section className="glass rounded-[1.25rem] p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-iris text-white">
            <FolderPlus className="size-4" aria-hidden />
          </span>
          <h2 className="text-[0.9375rem] font-bold text-ink">دسته جدید</h2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            add();
          }}
          className="grid gap-2"
        >
          <label htmlFor={id} className="text-[0.8125rem] font-medium text-ink-soft">
            نام دسته
          </label>
          <input
            id={id}
            value={name}
            maxLength={60}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            placeholder="مثلاً: مشاوره تحصیلی"
            aria-invalid={error ? true : undefined}
            className="input"
          />
          {error && <p className="field-error">{error}</p>}
          <button type="submit" disabled={pending || name.trim().length < 2} className="btn btn-primary mt-1">
            {pending ? <span className="loaderDotMiniWhite my-2" /> : "افزودن دسته"}
          </button>
        </form>
      </section>

      <section className="glass min-w-0 rounded-[1.25rem] p-3 sm:p-4">
        <h2 className="mb-3 flex items-center gap-2 px-1 text-[0.9375rem] font-bold text-ink">
          <Tags className="size-4 text-iris" aria-hidden />
          دسته‌بندی‌ها
        </h2>
        {categories.length === 0 ? (
          <p className="rounded-xl bg-white/50 px-4 py-10 text-center text-sm text-ink-soft">
            هنوز دسته‌ای ساخته نشده است.
          </p>
        ) : (
          <ul className="grid gap-2">
            {categories.map((c) => (
              <Row key={`${c.id}-${c.name}-${c.slug}`} category={c} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default CategoryManager;
