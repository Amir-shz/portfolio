import { Metadata } from "next";
import PageHeader from "@/components/dashboard/PageHeader";
import PostEditorForm from "@/components/dashboard/blog/PostEditorForm";
import { getAllTags, getCategoriesWithCounts } from "@/lib/blog/queries";
import { requireSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "نوشته جدید",
};

async function Page() {
  await requireSession();
  const [categories, tags] = await Promise.all([
    getCategoriesWithCounts({ publishedOnly: false }),
    getAllTags({ publishedOnly: false }),
  ]);
  return (
    <>
      <PageHeader title="نوشته جدید" backHref="/dashboard/blog" />
      <PostEditorForm
        post={null}
        categories={categories.map(({ id, name, slug }) => ({ id, name, slug }))}
        tagSuggestions={tags}
        siteUrl={process.env.NEXT_PUBLIC_BASE_URL ?? ""}
      />
    </>
  );
}

export default Page;
