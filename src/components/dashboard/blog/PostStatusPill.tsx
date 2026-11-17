import type { PostStatus } from "@/lib/blog/types";

function PostStatusPill({ status }: { status: PostStatus }) {
  const published = status === "published";
  return (
    <span className={published ? "status-new" : "status-done"}>
      <span aria-hidden className={`size-1.5 rounded-full ${published ? "bg-ok" : "bg-warn"}`} />
      {published ? "منتشرشده" : "پیش‌نویس"}
    </span>
  );
}

export default PostStatusPill;
