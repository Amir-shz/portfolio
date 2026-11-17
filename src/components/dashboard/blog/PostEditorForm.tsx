"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState, useTransition } from "react";
import type { JSONContent } from "@tiptap/react";
import { CircleAlert, ExternalLink, Eye, History, Plus, Send, Save, Undo2 } from "lucide-react";
import { createCategory, createPost, updatePost } from "@/lib/blogActions";
import { slugify } from "@/lib/blog/slug";
import { formatJalali, formatJalaliDateTime } from "@/lib/blog/format";
import type { BlogImageData, CategoryRef, PostEditData, PostStatus } from "@/lib/blog/types";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import TagInput from "./TagInput";
import CoverImageField from "./CoverImageField";

const RichTextEditor = dynamic(() => import("@/components/blog/editor/RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="grid gap-3">
      <div className="glass h-12 animate-pulse rounded-2xl" />
      <div className="h-[55vh] animate-pulse rounded-2xl bg-white/40" />
    </div>
  ),
});

type Fields = {
  title: string;
  slug: string;
  slugTouched: boolean;
  excerpt: string;
  coverImage: BlogImageData | null;
  categoryId: string | null;
  tags: string[];
  publishedAt: string | null;
  featured: boolean;
  seo: { title: string; description: string };
};

type Backup = { fields: Fields; content: JSONContent; savedAt: number };

const EMPTY_DOC: JSONContent = { type: "doc", content: [{ type: "paragraph" }] };

function readBackup(key: string): Backup | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Backup) : null;
  } catch {
    return null;
  }
}
function writeBackup(key: string, value: Backup | null) {
  try {
    if (value) localStorage.setItem(key, JSON.stringify(value));
    else localStorage.removeItem(key);
  } catch {
    // storage full or blocked: the backup is only a convenience
  }
}

/** ISO → value for <input type="datetime-local"> (browser time). */
function toLocalInput(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="glass rounded-[1.25rem] p-4">
      <h2 className="mb-3 text-sm font-bold text-ink">{title}</h2>
      {children}
    </section>
  );
}

function Counter({ value, max, ideal }: { value: number; max: number; ideal?: [number, number] }) {
  const good = ideal ? value >= ideal[0] && value <= ideal[1] : true;
  return (
    <span
      className={cn(
        "text-[0.6875rem] tabular-nums",
        value > max ? "text-danger-deep" : good ? "text-ok-deep" : "text-ink-faint",
      )}
    >
      {value.toLocaleString("fa-IR")} / {max.toLocaleString("fa-IR")}
    </span>
  );
}

function PostEditorForm({
  post,
  categories: initialCategories,
  tagSuggestions,
  siteUrl,
}: {
  post: PostEditData | null;
  categories: CategoryRef[];
  tagSuggestions: string[];
  siteUrl: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, startSaving] = useTransition();

  const [postId, setPostId] = useState<string | null>(post?.id ?? null);
  const [status, setStatus] = useState<PostStatus>(post?.status ?? "draft");
  const [savedAt, setSavedAt] = useState<string | null>(post?.updatedAt ?? null);
  const [fields, setFields] = useState<Fields>({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    slugTouched: Boolean(post),
    excerpt: post?.excerpt ?? "",
    coverImage: post?.coverImage ?? null,
    categoryId: post?.categoryId ?? null,
    tags: post?.tags ?? [],
    publishedAt: post?.publishedAt ?? null,
    featured: post?.featured ?? false,
    seo: post?.seo ?? { title: "", description: "" },
  });
  const contentRef = useRef<JSONContent>((post?.content as JSONContent) ?? EMPTY_DOC);
  const [editorSeed, setEditorSeed] = useState<{ key: number; content: JSONContent }>({
    key: 0,
    content: contentRef.current,
  });
  const [dirty, setDirty] = useState(false);
  const [pendingUploads, setPendingUploads] = useState(0);
  const [coverUploading, setCoverUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [backup, setBackup] = useState<Backup | null>(null);
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [addingCategory, startAddCategory] = useTransition();

  const backupKey = `blog-draft:${post?.id ?? "new"}`;
  const titleRef = useRef<HTMLTextAreaElement>(null);

  // grow the title box to fit its text
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [fields.title]);

  const ids ={ title: useId(), slug: useId(), excerpt: useId(), cat: useId(), date: useId(), seoT: useId(), seoD: useId(), feat: useId(), newCat: useId() };

  // Offer a local backup that is newer than the saved version.
  useEffect(() => {
    const b = readBackup(backupKey);
    const serverTime = post?.updatedAt ? new Date(post.updatedAt).getTime() : 0;
    if (b && b.savedAt > serverTime + 1000) setBackup(b);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep a local backup of unsaved work (debounced). Body edits only update a
  // ref (no re-render per keystroke), so they schedule the backup themselves;
  // field edits schedule it through the effect below.
  const fieldsRef = useRef(fields);
  useEffect(() => {
    fieldsRef.current = fields;
  }, [fields]);
  const backupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleBackup = useCallback(() => {
    if (backupTimer.current) clearTimeout(backupTimer.current);
    backupTimer.current = setTimeout(() => {
      backupTimer.current = null;
      writeBackup(backupKey, {
        fields: fieldsRef.current,
        content: contentRef.current,
        savedAt: Date.now(),
      });
    }, 1000);
  }, [backupKey]);
  const cancelBackup = useCallback(() => {
    if (backupTimer.current) clearTimeout(backupTimer.current);
    backupTimer.current = null;
  }, []);

  useEffect(() => {
    if (dirty) scheduleBackup();
  }, [dirty, fields, scheduleBackup]);

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const onLeave = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [dirty]);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((f) => {
      const next = { ...f, [key]: value };
      if (key === "title" && !f.slugTouched) next.slug = slugify(String(value));
      return next;
    });
    setErrors((e) => ({ ...e, [key]: "" }));
    setDirty(true);
  };

  const onContentChange = useCallback(
    (json: JSONContent) => {
      contentRef.current = json;
      setDirty(true);
      setErrors((e) => (e.content ? { ...e, content: "" } : e));
      scheduleBackup();
    },
    [scheduleBackup],
  );

  const save = useCallback(
    (nextStatus: PostStatus, { openPreview = false } = {}) => {
      if (pendingUploads > 0 || coverUploading) {
        toast({ description: "کمی صبر کنید تا آپلود عکس‌ها تمام شود." });
        return;
      }
      const previewTab = openPreview ? window.open("", "_blank") : null;
      setFormError("");
      startSaving(async () => {
        const input = {
          title: fields.title,
          slug: fields.slug,
          excerpt: fields.excerpt,
          coverImage: fields.coverImage,
          content: contentRef.current as Record<string, unknown>,
          categoryId: fields.categoryId,
          tags: fields.tags,
          status: nextStatus,
          publishedAt: fields.publishedAt,
          featured: fields.featured,
          seo: fields.seo,
        };
        const res = postId ? await updatePost(postId, input) : await createPost(input);
        if (!res.ok) {
          previewTab?.close();
          setErrors(res.fieldErrors ?? {});
          setFormError(res.error);
          toast({ variant: "destructive", description: res.error });
          return;
        }
        setDirty(false);
        // a backup still waiting to be written would bring the banner back
        cancelBackup();
        writeBackup(backupKey, null);
        setStatus(res.status as PostStatus);
        setSavedAt(res.updatedAt);
        setFields((f) => ({ ...f, slug: res.slug, slugTouched: true }));
        toast({
          description:
            nextStatus === "published"
              ? status === "published"
                ? "تغییرات منتشر شد."
                : "نوشته منتشر شد."
              : "پیش‌نویس ذخیره شد.",
        });
        if (previewTab) previewTab.location.href = `/blog/preview/${res.id}`;
        if (!postId) {
          setPostId(res.id);
          writeBackup(`blog-draft:new`, null);
          router.replace(`/dashboard/blog/${res.id}/edit`);
        } else {
          router.refresh();
        }
      });
    },
    [backupKey, cancelBackup, coverUploading, fields, pendingUploads, postId, router, status, toast],
  );

  // Ctrl/Cmd+S saves in the current status.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        save(status);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [save, status]);

  function addCategory() {
    const name = newCategory.trim();
    if (!name) return;
    startAddCategory(async () => {
      const res = await createCategory({ name });
      if (!res.ok) {
        toast({ variant: "destructive", description: res.error });
        return;
      }
      setCategories((c) => [...c, { id: res.id, name: res.name, slug: res.slug }]);
      set("categoryId", res.id);
      setNewCategory("");
    });
  }

  function restoreBackup() {
    if (!backup) return;
    setFields(backup.fields);
    contentRef.current = backup.content;
    setEditorSeed((s) => ({ key: s.key + 1, content: backup.content }));
    setBackup(null);
    setDirty(true);
  }

  const seoTitle = fields.seo.title || fields.title;
  const seoDesc = fields.seo.description || fields.excerpt;
  const urlPreview = `${siteUrl.replace(/\/$/, "")}/blog/${fields.slug || "…"}`;
  const busy = isSaving || pendingUploads > 0 || coverUploading;
  const saveLabel = useMemo(() => {
    if (pendingUploads > 0 || coverUploading) return "در حال آپلود عکس…";
    if (isSaving) return "در حال ذخیره…";
    if (dirty) return "تغییرات ذخیره نشده";
    if (savedAt) return `ذخیره شد · ${formatJalaliDateTime(savedAt)}`;
    return "هنوز ذخیره نشده";
  }, [coverUploading, dirty, isSaving, pendingUploads, savedAt]);

  const actions = (
    <div className="grid gap-2">
      {status === "published" ? (
        <>
          <button type="button" onClick={() => save("published")} disabled={busy} className="btn btn-primary w-full">
            <Send className="size-4 -scale-x-100" aria-hidden />
            به‌روزرسانی نوشته
          </button>
          <button type="button" onClick={() => save("draft")} disabled={busy} className="btn btn-ghost btn-sm w-full">
            <Undo2 className="size-3.5" aria-hidden />
            برگرداندن به پیش‌نویس
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick={() => save("published")} disabled={busy} className="btn btn-primary w-full">
            <Send className="size-4 -scale-x-100" aria-hidden />
            انتشار
          </button>
          <button type="button" onClick={() => save("draft")} disabled={busy} className="btn btn-glass w-full">
            <Save className="size-4" aria-hidden />
            ذخیره پیش‌نویس
          </button>
        </>
      )}
      <button
        type="button"
        onClick={() => save(status, { openPreview: true })}
        disabled={busy}
        className="btn btn-ghost btn-sm w-full"
      >
        <Eye className="size-3.5" aria-hidden />
        ذخیره و پیش‌نمایش
      </button>
    </div>
  );

  return (
    <div>
      {backup && (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-warn/30 bg-warn-tint px-4 py-3 text-[0.8125rem] text-warn-deep">
          <History className="size-4 shrink-0" aria-hidden />
          <span className="flex-1">
            نسخه ذخیره‌نشده‌ای از این نوشته در این مرورگر پیدا شد ({formatJalaliDateTime(new Date(backup.savedAt).toISOString())}).
          </span>
          <button type="button" onClick={restoreBackup} className="btn btn-sm bg-white text-warn-deep hover:bg-white/80">
            بازیابی
          </button>
          <button
            type="button"
            onClick={() => {
              writeBackup(backupKey, null);
              setBackup(null);
            }}
            className="btn btn-ghost btn-sm"
          >
            نادیده گرفتن
          </button>
        </div>
      )}

      {formError && (
        <p role="alert" className="mb-4 flex items-center gap-2 rounded-xl bg-danger-tint px-4 py-3 text-[0.8125rem] font-medium text-danger-deep">
          <CircleAlert className="size-4 shrink-0" aria-hidden />
          {formError}
        </p>
      )}

      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="min-w-0">
          <label htmlFor={ids.title} className="sr-only">
            عنوان نوشته
          </label>
          <textarea
            id={ids.title}
            value={fields.title}
            rows={1}
            maxLength={120}
            ref={titleRef}
            onChange={(e) => set("title", e.target.value.replace(/\n/g, " "))}
            placeholder="عنوان نوشته"
            aria-invalid={errors.title ? true : undefined}
            className="w-full resize-none overflow-hidden bg-transparent text-[clamp(1.5rem,2.6vw,2rem)] font-extrabold leading-[1.5] text-ink outline-none placeholder:text-ink-faint/70"
          />
          {errors.title && <p className="field-error -mt-1 mb-2">{errors.title}</p>}
          <p className="mb-4 text-[0.75rem] text-ink-faint" aria-live="polite">
            {saveLabel}
          </p>

          <RichTextEditor
            key={editorSeed.key}
            initialContent={editorSeed.content}
            onChange={onContentChange}
            onPendingUploadsChange={setPendingUploads}
            invalid={Boolean(errors.content)}
          />
          {errors.content && <p className="field-error">{errors.content}</p>}
        </div>

        <aside className="grid items-start gap-3 pb-24 md:grid-cols-2 xl:sticky xl:grid-cols-1 xl:top-24 xl:max-h-[calc(100dvh-7rem)] xl:overflow-y-auto xl:pb-2">
          <Card title="انتشار">
            <div className="mb-3 flex items-center justify-between text-[0.8125rem]">
              <span className="text-ink-soft">وضعیت</span>
              <span className={status === "published" ? "status-new" : "status-done"}>
                {status === "published" ? "منتشرشده" : "پیش‌نویس"}
              </span>
            </div>
            <label htmlFor={ids.date} className="text-[0.75rem] font-medium text-ink-soft">
              تاریخ انتشار
            </label>
            <input
              id={ids.date}
              type="datetime-local"
              value={toLocalInput(fields.publishedAt)}
              onChange={(e) =>
                set("publishedAt", e.target.value ? new Date(e.target.value).toISOString() : null)
              }
              className="input mt-1 min-h-0 py-2 text-sm"
            />
            <p className="mt-1 text-[0.6875rem] text-ink-faint">
              {fields.publishedAt
                ? formatJalali(fields.publishedAt, true)
                : "خالی بگذارید تا هنگام انتشار، تاریخ همان لحظه ثبت شود."}
            </p>
            <div className="mt-4 hidden xl:block">{actions}</div>
            {postId && status === "published" && (
              <a
                href={`/blog/${encodeURIComponent(fields.slug)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-[0.75rem] font-medium text-iris hover:underline"
              >
                <ExternalLink className="size-3.5" aria-hidden />
                مشاهده در سایت
              </a>
            )}
          </Card>

          <Card title="عکس کاور">
            <CoverImageField
              value={fields.coverImage}
              onChange={(v) => set("coverImage", v)}
              onUploadingChange={setCoverUploading}
            />
          </Card>

          <Card title="دسته‌بندی و برچسب">
            <label htmlFor={ids.cat} className="text-[0.8125rem] font-medium text-ink-soft">
              دسته‌بندی
            </label>
            <select
              id={ids.cat}
              value={fields.categoryId ?? ""}
              onChange={(e) => set("categoryId", e.target.value || null)}
              className="input mt-1.5 min-h-0 cursor-pointer py-2 text-sm"
            >
              <option value="">بدون دسته</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="field-error">{errors.categoryId}</p>}
            <div className="mt-2 flex gap-1.5">
              <label htmlFor={ids.newCat} className="sr-only">
                نام دسته جدید
              </label>
              <input
                id={ids.newCat}
                value={newCategory}
                maxLength={60}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCategory();
                  }
                }}
                placeholder="دسته جدید…"
                className="input min-h-0 py-1.5 text-sm"
              />
              <button
                type="button"
                onClick={addCategory}
                disabled={!newCategory.trim() || addingCategory}
                aria-label="افزودن دسته"
                className="icon-btn size-9 shrink-0 rounded-xl bg-iris-wash text-iris hover:bg-iris hover:text-white"
              >
                {addingCategory ? <span className="spinner size-3.5 border-2" /> : <Plus className="size-4" aria-hidden />}
              </button>
            </div>
            <div className="mt-4">
              <TagInput
                value={fields.tags}
                onChange={(t) => set("tags", t)}
                suggestions={tagSuggestions}
                error={errors.tags}
              />
            </div>
          </Card>

          <Card title="خلاصه و نامک">
            <div className="flex items-center justify-between">
              <label htmlFor={ids.excerpt} className="text-[0.8125rem] font-medium text-ink-soft">
                خلاصه
              </label>
              <Counter value={fields.excerpt.length} max={300} ideal={[100, 200]} />
            </div>
            <textarea
              id={ids.excerpt}
              value={fields.excerpt}
              maxLength={300}
              rows={4}
              onChange={(e) => set("excerpt", e.target.value)}
              placeholder="یکی دو جمله که در کارت نوشته و نتایج جستجو دیده می‌شود."
              className="input mt-1.5 resize-none py-2 text-sm leading-7"
            />
            {errors.excerpt && <p className="field-error">{errors.excerpt}</p>}

            <label htmlFor={ids.slug} className="mt-3 block text-[0.8125rem] font-medium text-ink-soft">
              نامک (آدرس)
            </label>
            <input
              id={ids.slug}
              value={fields.slug}
              maxLength={90}
              onChange={(e) => {
                setFields((f) => ({ ...f, slug: e.target.value, slugTouched: true }));
                setDirty(true);
              }}
              onBlur={() => setFields((f) => ({ ...f, slug: slugify(f.slug || f.title) }))}
              className="input mt-1.5 min-h-0 py-2 text-sm"
            />
            <p dir="ltr" className="mt-1 truncate text-start text-[0.6875rem] text-ink-faint">
              {urlPreview}
            </p>
            {errors.slug && <p className="field-error">{errors.slug}</p>}
          </Card>

          <Card title="سئو">
            <div className="flex items-center justify-between">
              <label htmlFor={ids.seoT} className="text-[0.8125rem] font-medium text-ink-soft">
                عنوان در گوگل
              </label>
              <Counter value={fields.seo.title.length} max={70} ideal={[30, 60]} />
            </div>
            <input
              id={ids.seoT}
              value={fields.seo.title}
              maxLength={70}
              onChange={(e) => set("seo", { ...fields.seo, title: e.target.value })}
              placeholder={fields.title || "پیش‌فرض: عنوان نوشته"}
              className="input mt-1.5 min-h-0 py-2 text-sm"
            />
            <div className="mt-3 flex items-center justify-between">
              <label htmlFor={ids.seoD} className="text-[0.8125rem] font-medium text-ink-soft">
                توضیح در گوگل
              </label>
              <Counter value={fields.seo.description.length} max={170} ideal={[110, 160]} />
            </div>
            <textarea
              id={ids.seoD}
              value={fields.seo.description}
              maxLength={170}
              rows={3}
              onChange={(e) => set("seo", { ...fields.seo, description: e.target.value })}
              placeholder={fields.excerpt || "پیش‌فرض: خلاصه نوشته"}
              className="input mt-1.5 resize-none py-2 text-sm leading-7"
            />
            <div className="mt-3 rounded-xl border border-ink/10 bg-white p-3" aria-label="پیش‌نمایش نتیجه جستجو">
              <p dir="ltr" className="truncate text-start text-[0.6875rem] text-ok-deep">
                {urlPreview}
              </p>
              <p className="line-clamp-1 text-[0.9375rem] font-medium text-[#1a0dab]">
                {seoTitle || "عنوان نوشته"} | فاطمه شفیعی
              </p>
              <p className="line-clamp-2 text-[0.75rem] leading-5 text-ink-soft">
                {seoDesc || "توضیح کوتاه نوشته اینجا نمایش داده می‌شود."}
              </p>
            </div>
          </Card>

          <Card title="نمایش">
            <label htmlFor={ids.feat} className="flex cursor-pointer items-start gap-3">
              <input
                id={ids.feat}
                type="checkbox"
                checked={fields.featured}
                onChange={(e) => set("featured", e.target.checked)}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className="relative mt-0.5 h-5 w-9 shrink-0 rounded-full bg-ink/15 transition-colors after:absolute after:right-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:bg-iris peer-checked:after:-translate-x-4 peer-focus-visible:ring-2 peer-focus-visible:ring-iris peer-focus-visible:ring-offset-2"
              />
              <span className="text-[0.8125rem] leading-6 text-ink-soft">
                <span className="block font-medium text-ink">نوشته ویژه</span>
                در بالای صفحه بلاگ به‌صورت بزرگ نمایش داده می‌شود.
              </span>
            </label>
          </Card>
        </aside>
      </div>

      {/* phones & tablets: actions stay in reach */}
      <div className="glass-strong fixed inset-x-3 bottom-3 z-30 rounded-2xl p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] xl:hidden">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => save(status === "published" ? "published" : "draft")}
            disabled={busy}
            className="btn btn-glass flex-1"
          >
            <Save className="size-4" aria-hidden />
            {status === "published" ? "به‌روزرسانی" : "ذخیره"}
          </button>
          {status !== "published" && (
            <button type="button" onClick={() => save("published")} disabled={busy} className="btn btn-primary flex-1">
              <Send className="size-4 -scale-x-100" aria-hidden />
              انتشار
            </button>
          )}
          <button
            type="button"
            onClick={() => save(status, { openPreview: true })}
            disabled={busy}
            aria-label="ذخیره و پیش‌نمایش"
            className="icon-btn size-11 rounded-xl bg-white/70 text-ink-soft"
          >
            <Eye className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostEditorForm;
