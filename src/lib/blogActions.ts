"use server";
// SECURITY NOTE: every exported function here is a Server Action, i.e. a
// public POST endpoint. The route guard (src/proxy.ts) does NOT protect them, so each one
// checks the session itself with requireUser().

import { isValidObjectId } from "mongoose";
import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/mongoose";
import { requireUser } from "@/lib/session";
import Post from "@/models/postModel";
import Category from "@/models/categoryModel";
import { ContentError, renderPost } from "@/lib/blog/render";
import { isAllowedImageSrc } from "@/lib/storage";
import { normalizeTag, slugify, uniqueSlug } from "@/lib/blog/slug";
import {
  categoryInputSchema,
  postInputSchema,
  type CategoryInput,
  type PostInput,
} from "@/lib/blog/validation";

export type ActionResult<T extends object = object> =
  | ({ ok: true } & T)
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

function fieldErrorsOf(issues: { path: (string | number)[]; message: string }[]) {
  const out: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path.join(".") || "form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

function isDuplicateKey(error: unknown) {
  return typeof error === "object" && error !== null && (error as { code?: number }).code === 11000;
}

function revalidateBlog(...slugs: (string | undefined)[]) {
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath("/dashboard/blog");
  for (const slug of new Set(slugs.filter(Boolean) as string[])) {
    // Persian slugs: refresh both the decoded and the URL-encoded path
    revalidatePath(`/blog/${slug}`);
    revalidatePath(`/blog/${encodeURIComponent(slug)}`);
  }
}

async function authorizedOrError(): Promise<
  { ok: true; user: Awaited<ReturnType<typeof requireUser>> } | { ok: false; error: string }
> {
  try {
    return { ok: true, user: await requireUser() };
  } catch {
    return { ok: false, error: "ابتدا وارد حساب کاربری شوید." };
  }
}

// ── Posts ────────────────────────────────────────────────────────────────

async function savePost(
  id: string | null,
  input: PostInput,
): Promise<ActionResult<{ id: string; slug: string; status: string; updatedAt: string }>> {
  const auth = await authorizedOrError();
  if (!auth.ok) return auth;

  const parsed = postInputSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors = fieldErrorsOf(parsed.error.issues);
    return { ok: false, error: Object.values(fieldErrors)[0], fieldErrors };
  }
  const data = parsed.data;

  if (id !== null && !isValidObjectId(id)) {
    return { ok: false, error: "نوشته پیدا نشد." };
  }

  await dbConnect();

  const existing = id ? await Post.findById(id) : null;
  if (id && !existing) return { ok: false, error: "نوشته پیدا نشد." };

  let rendered;
  try {
    rendered = renderPost(data.content);
  } catch (error) {
    if (error instanceof ContentError) return { ok: false, error: error.message };
    throw error;
  }

  if (data.status === "published" && rendered.wordCount === 0 && rendered.imageCount === 0) {
    return {
      ok: false,
      error: "برای انتشار، متن نوشته نباید خالی باشد.",
      fieldErrors: { content: "متن نوشته خالی است." },
    };
  }

  // covers are shown with next/image, which only loads our storage host
  if (data.coverImage?.url && !isAllowedImageSrc(data.coverImage.url)) {
    return {
      ok: false,
      error: "عکس کاور باید از طریق همین فرم آپلود شود.",
      fieldErrors: { coverImage: "آدرس عکس کاور مجاز نیست." },
    };
  }

  if (data.categoryId) {
    const exists = await Category.exists({ _id: data.categoryId });
    if (!exists) {
      return {
        ok: false,
        error: "دسته‌بندی انتخاب‌شده وجود ندارد.",
        fieldErrors: { categoryId: "دسته‌بندی نامعتبر است." },
      };
    }
  }

  const tags = [...new Set(data.tags.map(normalizeTag).filter(Boolean))].slice(0, 10);

  const slugBase = slugify(data.slug || data.title);
  const slug = await uniqueSlug(slugBase, async (candidate) =>
    Boolean(await Post.exists({ slug: candidate, ...(id ? { _id: { $ne: id } } : {}) })),
  );

  // First publish sets the date; an explicit date from the form wins.
  let publishedAt: Date | null = existing?.publishedAt ?? null;
  if (data.publishedAt) publishedAt = new Date(data.publishedAt);
  if (data.status === "published" && !publishedAt) publishedAt = new Date();

  const fields = {
    title: data.title,
    slug,
    excerpt: data.excerpt,
    coverImage: data.coverImage ?? { url: "", alt: "", width: 0, height: 0 },
    content: rendered.content,
    contentHtml: rendered.html,
    headings: rendered.headings,
    plainText: rendered.plainText,
    readingTime: rendered.readingTime,
    category: data.categoryId,
    tags,
    status: data.status,
    publishedAt,
    featured: data.featured,
    seo: data.seo,
  };

  try {
    let saved;
    if (existing) {
      const oldSlug = existing.slug;
      existing.set(fields);
      saved = await existing.save();
      revalidateBlog(oldSlug, saved.slug);
      revalidatePath(`/dashboard/blog/${String(saved._id)}/edit`);
    } else {
      saved = await Post.create({
        ...fields,
        author: auth.user._id,
        authorName: auth.user.name ?? "",
      });
      revalidateBlog(saved.slug);
    }
    return {
      ok: true,
      id: String(saved._id),
      slug: saved.slug,
      status: saved.status,
      updatedAt: new Date(
        (saved as unknown as { updatedAt?: Date }).updatedAt ?? Date.now(),
      ).toISOString(),
    };
  } catch (error) {
    if (isDuplicateKey(error)) {
      return {
        ok: false,
        error: "این نامک قبلاً استفاده شده است.",
        fieldErrors: { slug: "نامک تکراری است." },
      };
    }
    console.error("savePost failed:", error);
    return { ok: false, error: "ذخیره نوشته با مشکل مواجه شد." };
  }
}

export async function createPost(input: PostInput) {
  return savePost(null, input);
}

export async function updatePost(id: string, input: PostInput) {
  return savePost(id, input);
}

export async function setPostStatus(
  id: string,
  status: "draft" | "published",
): Promise<ActionResult> {
  const auth = await authorizedOrError();
  if (!auth.ok) return auth;
  if (!isValidObjectId(id) || (status !== "draft" && status !== "published")) {
    return { ok: false, error: "درخواست نامعتبر است." };
  }

  await dbConnect();
  const post = await Post.findById(id).select("slug status publishedAt readingTime contentHtml");
  if (!post) return { ok: false, error: "نوشته پیدا نشد." };

  if (status === "published" && !post.contentHtml) {
    return { ok: false, error: "برای انتشار، متن نوشته نباید خالی باشد." };
  }

  post.status = status;
  if (status === "published" && !post.publishedAt) post.publishedAt = new Date();
  await post.save();

  revalidateBlog(post.slug);
  return { ok: true };
}

export async function deletePost(id: string): Promise<ActionResult> {
  const auth = await authorizedOrError();
  if (!auth.ok) return auth;
  if (!isValidObjectId(id)) return { ok: false, error: "نوشته پیدا نشد." };

  await dbConnect();
  const post = await Post.findByIdAndDelete(id).select("slug");
  if (!post) return { ok: false, error: "نوشته پیدا نشد." };

  revalidateBlog(post.slug);
  return { ok: true };
}

// ── Categories ───────────────────────────────────────────────────────────

async function saveCategory(
  id: string | null,
  input: CategoryInput,
): Promise<ActionResult<{ id: string; name: string; slug: string }>> {
  const auth = await authorizedOrError();
  if (!auth.ok) return auth;

  const parsed = categoryInputSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors = fieldErrorsOf(parsed.error.issues);
    return { ok: false, error: Object.values(fieldErrors)[0], fieldErrors };
  }
  if (id !== null && !isValidObjectId(id)) return { ok: false, error: "دسته پیدا نشد." };

  await dbConnect();
  const { name, order } = parsed.data;
  const slug = await uniqueSlug(slugify(parsed.data.slug || name) || "category", async (s) =>
    Boolean(await Category.exists({ slug: s, ...(id ? { _id: { $ne: id } } : {}) })),
  );

  try {
    const saved = id
      ? await Category.findByIdAndUpdate(id, { name, slug, order }, { new: true, runValidators: true })
      : await Category.create({ name, slug, order });
    if (!saved) return { ok: false, error: "دسته پیدا نشد." };

    revalidateBlog();
    revalidatePath("/dashboard/blog/categories");
    return { ok: true, id: String(saved._id), name: saved.name, slug: saved.slug };
  } catch (error) {
    if (isDuplicateKey(error)) {
      return {
        ok: false,
        error: "دسته‌ای با این نام وجود دارد.",
        fieldErrors: { name: "نام تکراری است." },
      };
    }
    console.error("saveCategory failed:", error);
    return { ok: false, error: "ذخیره دسته با مشکل مواجه شد." };
  }
}

export async function createCategory(input: CategoryInput) {
  return saveCategory(null, input);
}

export async function updateCategory(id: string, input: CategoryInput) {
  return saveCategory(id, input);
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  const auth = await authorizedOrError();
  if (!auth.ok) return auth;
  if (!isValidObjectId(id)) return { ok: false, error: "دسته پیدا نشد." };

  await dbConnect();
  const used = await Post.countDocuments({ category: id });
  if (used > 0) {
    return {
      ok: false,
      error: `این دسته در ${used.toLocaleString("fa-IR")} نوشته استفاده شده است؛ ابتدا دسته آن نوشته‌ها را تغییر دهید.`,
    };
  }
  const removed = await Category.findByIdAndDelete(id);
  if (!removed) return { ok: false, error: "دسته پیدا نشد." };

  revalidateBlog();
  revalidatePath("/dashboard/blog/categories");
  return { ok: true };
}
