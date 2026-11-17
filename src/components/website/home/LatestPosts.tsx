import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PostCard } from "@/components/blog/PostCard";
import { getLatestPosts } from "@/lib/blog/queries";
import { h2, sectionGap, wrap } from "../styles";

// Three newest articles; renders nothing until the first post is published.
async function LatestPosts() {
  const posts = await getLatestPosts(3);
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="latest-posts-heading" className={`${wrap} ${sectionGap}`}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">بلاگ</span>
          <h2 id="latest-posts-heading" className={`${h2} mt-3`}>
            تازه‌ترین نوشته‌ها
          </h2>
        </div>
        <Link href="/blog" className="btn btn-glass btn-sm">
          همه نوشته‌ها
          <ArrowLeft className="size-3.5" aria-hidden />
        </Link>
      </div>
      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LatestPosts;
