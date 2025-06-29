import SocialSection from "@/components/layouts/SocialSection";
import AboutInHome from "@/components/layouts/AboutInHome";
import WorkHistory from "@/components/layouts/WorkHistory";
import HomeServiceSection from "@/components/layouts/HomeServiceSection";
import Faq from "@/components/ui/Faq";
import { Metadata } from "next";
import Link from "next/link";
import TestimonialSection from "@/components/layouts/TestimonialSection";

export const metadata: Metadata = {
  description:
    "فاطمه سادات شفیعی، روانشناس صنعتی و سازمانی با سابقه همکاری با شرکت‌های معتبر مانند ذوب‌آهن، هنزا و مپنا. ارائه مشاوره‌های تخصصی در زمینه‌های سازمانی، فردی و تحصیلی برای بهبود عملکرد و توسعه فردی.",
};

export default function Page(): React.ReactNode {
  return (
    <div className=" flex flex-col gap-6 max-sm:-mt-8">
      {/*  */}
      <div className=" sm:hidden size-full rounded-2xl border border-neutral-300 px-3 py-2 flex gap-1 items-center ">
        <p className="text-p3_SB_mobile basis-[60%] text-neutral-600">
          بهره‌گیری از خدمات و مشاوره
        </p>
        {/* bg-neutral-50  text-neutral-800 */}
        <Link
          href="/services"
          className=" basis-[40%] block w-full rounded-xl text-purple-500 border border-purple-500  py-[10px] font-bold text-base leading-[1.125rem] text-center"
        >
          رزرو نوبت
        </Link>
      </div>
      {/*  */}
      <div className="flex gap-6 max-sm:flex-col">
        <div className=" basis-3/5">
          <AboutInHome />
        </div>
        <div className="basis-2/5 flex flex-col justify-between gap-8 max-sm:flex-col-reverse max-sm:gap-6">
          <SocialSection />
          <WorkHistory />
        </div>
      </div>
      <HomeServiceSection />
      <TestimonialSection />
      <Faq />
    </div>
  );
}
