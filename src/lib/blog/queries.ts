// Server-only, read-only data access for the blog. Everything returned is a
// plain object (dates as ISO strings) so it can be passed to any component.
import { isValidObjectId, type FilterQuery } from "mongoose";
import dbConnect from "@/lib/mongoose";
import Post, { type PostDoc } from "@/models/postModel";
import Category from "@/models/categoryModel";
import type {
  AdminPostRow,
  CategoryRef,
  CategoryWithCount,
  Paged,
  PostCardData,
  PostDetailData,
  PostEditData,
  PostStatus,
} from "./types";

export const POSTS_PER_PAGE = 9;
const ADMIN_PAGE_SIZE = 20;

// fields a card needs (never the heavy content)
const CARD_FIELDS =
  "slug title excerpt coverImage category tags publishedAt readingTime featured status updatedAt";

type LeanPost = Omit<PostDoc, "category"> & {
  _id: unknown;
  category?: { _id: unknown; name: string; slug: string } | null;
  createdAt?: Date;
  updatedAt?: Date;
};

const iso = (d?: Date | null) => (d ? new Date(d).toISOString() : null);

function toCategoryRef(c: LeanPost["category"]): CategoryRef | null {
  return c && typeof c === "object" && "name" in c
    ? { id: String(c._id), name: c.name, slug: c.slug }
    : null;
}

function toCard(p: LeanPost): PostCardData {
  const cover = p.coverImage?.url
    ? {
        url: p.coverImage.url,
        alt: p.coverImage.alt ?? "",
        width: p.coverImage.width ?? 0,
        height: p.coverImage.height ?? 0,
      }
    : null;
  return {
    id: String(p._id),
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    coverImage: cover,
    category: toCategoryRef(p.category),
    tags: p.tags ?? [],
    publishedAt: iso(p.publishedAt),
    readingTime: p.readingTime ?? 1,
    featured: Boolean(p.featured),
  };
}

function toDetail(p: LeanPost): PostDetailData {
  return {
    ...toCard(p),
    contentHtml: p.contentHtml ?? "",
    headings: (p.headings ?? []).map((h) => ({ id: h.id, text: h.text, level: h.level })),
    authorName: p.authorName ?? "",
    createdAt: iso(p.createdAt) ?? new Date().toISOString(),
    updatedAt: iso(p.updatedAt) ?? new Date().toISOString(),
    seo: { title: p.seo?.title ?? "", description: p.seo?.description ?? "" },
    status: p.status as PostStatus,
  };
}

/** Escapes user text for a safe "contains" regex. */
function containsRegex(q: string) {
  return new RegExp(q.slice(0, 60).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
}

function publishedFilter(): FilterQuery<PostDoc> {
  return { status: "published", publishedAt: { $ne: null, $lte: new Date() } };
}

async function categoryIdBySlug(slug?: string) {
  if (!slug) return undefined;
  const cat = await Category.findOne({ slug }).select("_id").lean();
  return cat ? cat._id : null;
}

export async function getPublishedPosts({
  page = 1,
  category,
  tag,
  q,
  perPage = POSTS_PER_PAGE,
}: {
  page?: number;
  category?: string;
  tag?: string;
  q?: string;
  perPage?: number;
}): Promise<Paged<PostCardData>> {
  await dbConnect();
  const filter: FilterQuery<PostDoc> = publishedFilter();

  const categoryId = await categoryIdBySlug(category);
  if (categoryId === null) return { items: [], total: 0, page: 1, pageCount: 1 };
  if (categoryId) filter.category = categoryId;
  if (tag) filter.tags = tag;
  if (q?.trim()) {
    const rx = containsRegex(q.trim());
    filter.$or = [{ title: rx }, { excerpt: rx }, { tags: rx }];
  }

  const total = await Post.countDocuments(filter);
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, Math.floor(page) || 1), pageCount);

  const items = (await Post.find(filter)
    .sort({ publishedAt: -1, _id: -1 })
    .skip((current - 1) * perPage)
    .limit(perPage)
    .select(CARD_FIELDS)
    .populate("category", "name slug")
    .lean()) as unknown as LeanPost[];

  return { items: items.map(toCard), total, page: current, pageCount };
}

/** Featured post first (if any), then the newest — for the blog's top block. */
export async function getFeaturedPosts(limit = 3): Promise<PostCardData[]> {
  await dbConnect();
  const items = (await Post.find(publishedFilter())
    .sort({ featured: -1, publishedAt: -1 })
    .limit(limit)
    .select(CARD_FIELDS)
    .populate("category", "name slug")
    .lean()) as unknown as LeanPost[];
  return items.map(toCard);
}

export async function getLatestPosts(limit = 3): Promise<PostCardData[]> {
  try {
    await dbConnect();
    const items = (await Post.find(publishedFilter())
      .sort({ publishedAt: -1 })
      .limit(limit)
      .select(CARD_FIELDS)
      .populate("category", "name slug")
      .lean()) as unknown as LeanPost[];
    return items.map(toCard);
  } catch (error) {
    // the home page must still render if the blog query fails
    console.error("getLatestPosts failed:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<PostDetailData | null> {
  await dbConnect();
  const post = (await Post.findOne({ slug, ...publishedFilter() })
    .populate("category", "name slug")
    .lean()) as unknown as LeanPost | null;
  return post ? toDetail(post) : null;
}

/** Any status — only for signed-in preview. */
export async function getPostForPreview(id: string): Promise<PostDetailData | null> {
  if (!isValidObjectId(id)) return null;
  await dbConnect();
  const post = (await Post.findById(id)
    .populate("category", "name slug")
    .lean()) as unknown as LeanPost | null;
  return post ? toDetail(post) : null;
}

export async function getPublishedSlugs(): Promise<{ slug: string; updatedAt: string }[]> {
  await dbConnect();
  const posts = (await Post.find(publishedFilter())
    .select("slug updatedAt")
    .sort({ publishedAt: -1 })
    .lean()) as unknown as LeanPost[];
  return posts.map((p) => ({ slug: p.slug, updatedAt: iso(p.updatedAt) ?? "" }));
}

export async function getRelatedPosts(post: PostCardData, limit = 3): Promise<PostCardData[]> {
  await dbConnect();
  const base = { ...publishedFilter(), _id: { $ne: post.id } };
  const picked: LeanPost[] = [];

  if (post.category) {
    picked.push(
      ...((await Post.find({ ...base, category: post.category.id })
        .sort({ publishedAt: -1 })
        .limit(limit)
        .select(CARD_FIELDS)
        .populate("category", "name slug")
        .lean()) as unknown as LeanPost[]),
    );
  }
  if (picked.length < limit && post.tags.length) {
    const ids = picked.map((p) => p._id);
    picked.push(
      ...((await Post.find({ ...base, _id: { $nin: [post.id, ...ids] }, tags: { $in: post.tags } })
        .sort({ publishedAt: -1 })
        .limit(limit - picked.length)
        .select(CARD_FIELDS)
        .populate("category", "name slug")
        .lean()) as unknown as LeanPost[]),
    );
  }
  if (picked.length < limit) {
    const ids = picked.map((p) => p._id);
    picked.push(
      ...((await Post.find({ ...base, _id: { $nin: [post.id, ...ids] } })
        .sort({ publishedAt: -1 })
        .limit(limit - picked.length)
        .select(CARD_FIELDS)
        .populate("category", "name slug")
        .lean()) as unknown as LeanPost[]),
    );
  }
  return picked.slice(0, limit).map(toCard);
}

/** Categories with the number of published posts in each. */
export async function getCategoriesWithCounts({
  publishedOnly = true,
}: { publishedOnly?: boolean } = {}): Promise<CategoryWithCount[]> {
  await dbConnect();
  const [categories, counts] = await Promise.all([
    Category.find().sort({ order: 1, name: 1 }).lean(),
    Post.aggregate<{ _id: unknown; count: number }>([
      { $match: publishedOnly ? publishedFilter() : {} },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]),
  ]);
  const byId = new Map(counts.map((c) => [String(c._id), c.count]));
  return categories.map((c) => ({
    id: String(c._id),
    name: c.name,
    slug: c.slug,
    order: c.order ?? 0,
    count: byId.get(String(c._id)) ?? 0,
  }));
}

export async function getAllTags({ publishedOnly = true } = {}): Promise<string[]> {
  await dbConnect();
  const rows = await Post.aggregate<{ _id: string; n: number }>([
    { $match: publishedOnly ? publishedFilter() : {} },
    { $unwind: "$tags" },
    { $group: { _id: "$tags", n: { $sum: 1 } } },
    { $sort: { n: -1, _id: 1 } },
    { $limit: 60 },
  ]);
  return rows.map((r) => r._id);
}

// ── Dashboard ────────────────────────────────────────────────────────────

export async function getPostsForAdmin({
  status,
  q,
  category,
  page = 1,
}: {
  status?: string;
  q?: string;
  category?: string;
  page?: number;
}): Promise<Paged<AdminPostRow> & { counts: Record<"all" | PostStatus, number> }> {
  await dbConnect();
  const filter: FilterQuery<PostDoc> = {};
  if (status === "draft" || status === "published") filter.status = status;
  if (category && isValidObjectId(category)) filter.category = category;
  if (q?.trim()) {
    const rx = containsRegex(q.trim());
    filter.$or = [{ title: rx }, { slug: rx }, { tags: rx }];
  }

  const [total, all, published] = await Promise.all([
    Post.countDocuments(filter),
    Post.countDocuments(),
    Post.countDocuments({ status: "published" }),
  ]);
  const pageCount = Math.max(1, Math.ceil(total / ADMIN_PAGE_SIZE));
  const current = Math.min(Math.max(1, Math.floor(page) || 1), pageCount);

  const items = (await Post.find(filter)
    .sort({ updatedAt: -1 })
    .skip((current - 1) * ADMIN_PAGE_SIZE)
    .limit(ADMIN_PAGE_SIZE)
    .select(CARD_FIELDS)
    .populate("category", "name slug")
    .lean()) as unknown as LeanPost[];

  return {
    items: items.map((p) => ({
      ...toCard(p),
      status: p.status as PostStatus,
      updatedAt: iso(p.updatedAt) ?? "",
    })),
    total,
    page: current,
    pageCount,
    counts: { all, published, draft: all - published },
  };
}

export async function getPostForEdit(id: string): Promise<PostEditData | null> {
  if (!isValidObjectId(id)) return null;
  await dbConnect();
  const p = (await Post.findById(id).lean()) as unknown as
    | (LeanPost & { category?: unknown })
    | null;
  if (!p) return null;
  return {
    id: String(p._id),
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt ?? "",
    coverImage: p.coverImage?.url
      ? {
          url: p.coverImage.url,
          alt: p.coverImage.alt ?? "",
          width: p.coverImage.width ?? 0,
          height: p.coverImage.height ?? 0,
        }
      : null,
    content: (p.content as Record<string, unknown>) ?? { type: "doc", content: [] },
    categoryId: p.category ? String(p.category) : null,
    tags: p.tags ?? [],
    status: p.status as PostStatus,
    publishedAt: iso(p.publishedAt),
    featured: Boolean(p.featured),
    seo: { title: p.seo?.title ?? "", description: p.seo?.description ?? "" },
    updatedAt: iso(p.updatedAt) ?? "",
  };
}
