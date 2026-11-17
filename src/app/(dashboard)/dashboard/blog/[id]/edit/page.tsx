import { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import PostEditorForm from "@/components/dashboard/blog/PostEditorForm";
import { getAllTags, getCategoriesWithCounts, getPostForEdit } from "@/lib/blog/queries";
import { requireSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ویرایش نوشته",
};

async function Page({ params }: { params: Promise<{ id: string }> }) {
  await requireSession();
  const { id } = await params;
  const [post, categories, tags] = await Promise.all([
    getPostForEdit(id),
    getCategoriesWithCounts({ publishedOnly: false }),
    getAllTags({ publishedOnly: false }),
  ]);
  if (!post) notFound();

  return (
    <>
      <PageHeader title="ویرایش نوشته" backHref="/dashboard/blog" />
      <PostEditorForm
        key={post.id}
        post={post}
        categories={categories.map(({ id: cid, name, slug }) => ({ id: cid, name, slug }))}
        tagSuggestions={tags}
        siteUrl={process.env.NEXT_PUBLIC_BASE_URL ?? ""}
      />
    </>
  );
}

export default Page;
