"use client";

import { changePhoto } from "@/lib/actions";
import { S3 } from "aws-sdk";
import Image from "next/image";
import { ChangeEvent, useTransition } from "react";
import { HiOutlineCamera } from "react-icons/hi2";

const accessKeyId = process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY as string;
const secretAccessKey = process.env.NEXT_PUBLIC_LIARA_SECRET_KEY as string;
const endpoint = process.env.NEXT_PUBLIC_LIARA_ENDPOINT as string;
const bucket = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME as string;

function UserPhoto({ img, name }: { img: string; name: string }) {
  const [isPending, startTransition] = useTransition();

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    startTransition(async () => {
      const file = e.target.files?.[0] as File;

      const s3 = new S3({
        accessKeyId,
        secretAccessKey,
        endpoint,
      });

      const params = {
        Bucket: bucket,
        Key: file.name,
        Body: file,
        ContentType: "image/jpeg",
      };

      try {
        const response = await s3.upload(params).promise();

        changePhoto(response.Location);
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
          width={256}
          height={256}
          quality={100}
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
          accept="image/*"
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default UserPhoto;
