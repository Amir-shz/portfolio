"use client";

import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useTransition } from "react";
import { Camera } from "lucide-react";

// The file is sent to our own API route, which uploads it to object storage
// on the server. Storage credentials must never be used in the browser.
function UserPhoto({ img, name }: { img: string; name: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();
  // a stored photo URL can stop working (deleted file, old bucket); show the
  // initial instead of a broken-image icon. Reset when a new photo arrives.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showPhoto = Boolean(img) && failedSrc !== img;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    // allow choosing the same file again later
    e.target.value = "";
    if (!file) return;

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("photo", file);

        const res = await fetch("/api/v1/user/photo", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          toast({
            variant: "destructive",
            description: data?.message ?? "آپلود عکس با مشکل مواجه شد",
          });
          return;
        }

        router.refresh();
      } catch (error) {
        console.error("Error uploading file:", error);
        toast({ variant: "destructive", description: "آپلود عکس با مشکل مواجه شد" });
      }
    });
  }

  return (
    <div className="relative shrink-0">
      {showPhoto ? (
        <Image
          src={img}
          alt=""
          width={256}
          height={256}
          unoptimized
          onError={() => setFailedSrc(img)}
          className="size-9 rounded-full object-cover ring-2 ring-white"
        />
      ) : (
        <div
          aria-hidden
          className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-iris to-iris-soft text-sm font-bold text-white ring-2 ring-white"
        >
          {name}
        </div>
      )}
      <label
        className="absolute -bottom-1 -right-1 grid size-5 cursor-pointer place-items-center rounded-full bg-iris text-white ring-2 ring-white transition-colors hover:bg-iris-deep"
        title="تغییر عکس پروفایل"
      >
        {isPending ? (
          <span className="spinner size-3 border-2" />
        ) : (
          <Camera className="size-3" aria-hidden />
        )}
        <span className="sr-only">تغییر عکس پروفایل</span>
        <input
          type="file"
          className="sr-only"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default UserPhoto;
