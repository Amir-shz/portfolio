import { Metadata } from "next";
import PageHeader from "@/components/dashboard/PageHeader";
import BlogTabs from "@/components/dashboard/blog/BlogTabs";
import CategoryManager from "@/components/dashboard/blog/CategoryManager";
import { getCategoriesWithCounts } from "@/lib/blog/queries";
import { requireSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "دسته‌بندی‌های بلاگ",
};

async function Page() {
  await requireSession();
  const categories = await getCategoriesWithCounts({ publishedOnly: false });
  return (
    <>
      <PageHeader title="بلاگ" description="دسته‌بندی نوشته‌ها را مدیریت کنید." />
      <BlogTabs />
      <CategoryManager categories={categories} />
    </>
  );
}

export default Page;
