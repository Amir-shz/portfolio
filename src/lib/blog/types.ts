// Plain data shapes passed from the server to components (no Mongoose docs).

export type BlogImageData = { url: string; alt: string; width: number; height: number };

export type Heading = { id: string; text: string; level: number };

export type CategoryRef = { id: string; name: string; slug: string };

export type CategoryWithCount = CategoryRef & { count: number; order: number };

export type PostStatus = "draft" | "published";

export type PostCardData = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: BlogImageData | null;
  category: CategoryRef | null;
  tags: string[];
  publishedAt: string | null;
  readingTime: number;
  featured: boolean;
};

export type PostDetailData = PostCardData & {
  contentHtml: string;
  headings: Heading[];
  authorName: string;
  createdAt: string;
  updatedAt: string;
  seo: { title: string; description: string };
  status: PostStatus;
};

export type AdminPostRow = PostCardData & {
  status: PostStatus;
  updatedAt: string;
};

export type PostEditData = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: BlogImageData | null;
  content: Record<string, unknown>;
  categoryId: string | null;
  tags: string[];
  status: PostStatus;
  publishedAt: string | null;
  featured: boolean;
  seo: { title: string; description: string };
  updatedAt: string;
};

export type Paged<T> = { items: T[]; total: number; page: number; pageCount: number };
