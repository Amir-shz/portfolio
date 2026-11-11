"use client";

import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";
import { HiOutlineCamera } from "react-icons/hi2";

// The file is sent to our own API route, which uploads it to object storage
// on the server. Storage credentials must never be used in the browser.
function UserPhoto({ img, name }: { img: string; name: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

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
            description: data?.message ?? "آپلود عکس با مشکل مواجه شد",
          });
          return;
        }

        router.refresh();
      } catch (error) {
        console.error("Error uploading file:", error);
        toast({ description: "آپلود عکس با مشکل مواجه شد" });
      }
    });
  }

  return (
    <div className=" relative">
      {img ? (
        <Image
          src={img}
          alt="user photo"
          width={256}
          height={256}
          quality={100}
          unoptimized
          className="rounded-full object-cover size-12 aspect-square max-sm:size-14"
        />
      ) : (
        <div className=" size-11 bg-neutral-500 rounded-full flex justify-center items-center text-neutral-50 text-xl font-medium max-sm:size-14">
          {name}
        </div>
      )}
      <label className="absolute bottom-0 -right-1 size-5 cursor-pointer max-sm:size-6 max-sm:-bottom-1 max-sm:-right-2">
        <span className="relative flex size-5 items-center justify-center rounded-full bg-purple-500 text-neutral-50 max-sm:size-6">
          {isPending ? (
            <div className="loaderSpinnerMiniWhite size-4"></div>
          ) : (
            <HiOutlineCamera className="size-4  stroke-2" />
          )}
        </span>
        <input
          type="file"
          className="hidden h-0 w-0"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default UserPhoto;
