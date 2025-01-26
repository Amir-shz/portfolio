"use client";

import Image from "next/image";
import { ChangeEvent } from "react";
import { HiOutlineCamera } from "react-icons/hi2";

function UserPhoto({ img }: { img: string }) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);
  }

  return (
    <div className=" relative">
      <Image
        src={img}
        alt="user photo"
        width={48}
        height={48}
        className="rounded-full object-cover"
      />
      <label className="absolute bottom-0 -right-1 size-5 cursor-pointer">
        <span className="relative flex size-5 items-center justify-center rounded-full bg-purple-500 text-neutral-50">
          <HiOutlineCamera className="size-4  stroke-2" />
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
