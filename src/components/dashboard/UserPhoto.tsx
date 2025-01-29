"use client";

import { changePhoto } from "@/lib/actions";
import Image from "next/image";
import { ChangeEvent, useTransition } from "react";
import { HiOutlineCamera } from "react-icons/hi2";

const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string;

const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET as string;

function UserPhoto({ img, name }: { img: string; name: string }) {
  const [isPending, startTransition] = useTransition();

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    startTransition(async () => {
      const file = e.target.files?.[0] as File;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("quality", "100");

      try {
        const response = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        changePhoto(data.secure_url);
      } catch (error) {
        console.error("❌", "Error uploading file:", error);
      }
    });
  }

  return (
    <div className=" relative">
      {img ? (
        <Image
          src={img}
          alt="user photo"
          width={48}
          height={48}
          className="rounded-full object-cover size-12 aspect-square"
        />
      ) : (
        <div className=" size-11 bg-neutral-500 rounded-full flex justify-center items-center text-neutral-50 text-xl font-medium">
          {name}
        </div>
      )}
      <label className="absolute bottom-0 -right-1 size-5 cursor-pointer">
        <span className="relative flex size-5 items-center justify-center rounded-full bg-purple-500 text-neutral-50">
          {isPending ? (
            <div className="loaderSpinnerMiniWhite size-4"></div>
          ) : (
            <HiOutlineCamera className="size-4  stroke-2" />
          )}
        </span>
        <input
          type="file"
          className="hidden h-0 w-0"
          accept="image/*"
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default UserPhoto;
