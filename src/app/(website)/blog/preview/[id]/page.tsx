import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Eye, Pencil } from "lucide-react";
import { auth } from "@/auth";
import ArticleView from "@/components/blog/ArticleView";
import { postHref } from "@/components/blog/PostCard";
import { getPostForPreview } from "@/lib/blog/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "پیش‌نمایش نوشته",
  robots: { index: false, follow: false },
};

async function Page({ params }: { params: Promise<{ id: string }> }) {
  // drafts are only visible to signed-in panel users
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { id } = await params;
  const post = await getPostForPreview(id);
  if (!post) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  return (
    <ArticleView
      post={post}
      url={`${baseUrl}${postHref(post.slug)}`}
      banner={
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-warn/30 bg-warn-tint px-4 py-3 text-[0.8125rem] text-warn-deep">
          <Eye className="size-4 shrink-0" aria-hidden />
          <span className="flex-1">
            پیش‌نمایش — {post.status === "published" ? "این نوشته منتشر شده است." : "این نوشته هنوز منتشر نشده و فقط شما آن را می‌بینید."}
          </span>
          <Link href={`/dashboard/blog/${post.id}/edit`} className="btn btn-sm bg-white text-warn-deep hover:bg-white/80">
            <Pencil className="size-3.5" aria-hidden />
            ادامه ویرایش
          </Link>
        </div>
      }
    />
  );
}

export default Page;
