import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "صفحه مورد نظر يافت نشد",
};
function NotFound() {
  return (
    <>
      <div className=" w-full h-dvh relative flex flex-col items-center justify-center overflow-hidden">
        <p className=" absolute bottom-36 text-center w-full z-50 text-4xl font-semibold text-purple-600 max-sm:bottom-72 max-sm:text-2xl">
          صفحه مورد نظر یافت نشد
        </p>
        <Link
          href="/"
          className=" bg-purple-400 px-6 py-2 text-neutral-50 font-medium rounded z-50 absolute bottom-20 hover:bg-purple-600 duration-300 max-sm:bottom-56"
        >
          بازگشت به خانه
        </Link>
      </div>
      <Image
        src="/404.svg"
        alt="404"
        fill
        className=" scale-90 -translate-y-16 max-sm:scale-100 max-sm:-translate-y-24"
      />
    </>
  );
}

export default NotFound;
