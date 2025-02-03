"use client"; // Error boundaries must be Client Components

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    document.title = "با مشکل مواجه شدیم";

    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <div className=" w-full h-dvh relative flex flex-col items-center justify-center overflow-hidden">
        <div className=" absolute bottom-32 text-center w-full z-50  flex flex-col gap-2 max-sm:bottom-52 max-[430px]:bottom-60">
          <p className="text-4xl font-semibold text-error-700  max-sm:text-2xl">
            با مشکلی مواجه شدیم
          </p>
          <p className=" text-error-800 mx-2">{error.message}</p>
          <p>{error.digest}</p>
        </div>
        <div className="absolute  bottom-20  z-50  max-sm:bottom-40 flex flex-row-reverse gap-4 items-center max-[430px]:bottom-40">
          <Link
            href="/"
            className=" bg-purple-400 px-6 py-2 text-neutral-50 font-medium rounded hover:bg-purple-600 duration-300"
          >
            بازگشت به خانه
          </Link>
          <button
            className=" bg-error-500 px-6 py-2 text-neutral-50 font-medium rounded hover:bg-error-700 duration-300"
            onClick={() => reset()}
          >
            تلاش مجدد
          </button>
        </div>
      </div>
      <Image
        src="/error.svg"
        alt="error"
        fill
        className=" scale-[65%] -translate-y-24 max-sm:scale-75 max-sm:-translate-y-24"
      />
    </>
  );
}
