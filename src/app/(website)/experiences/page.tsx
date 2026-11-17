import { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowLeft, BriefcaseBusiness, GraduationCap } from "lucide-react";
import photo from "../../../../public/fateme3.jpg";
import GlassPortrait, { GlassChip } from "@/components/website/GlassPortrait";
import RecordList from "@/components/website/experiences/RecordList";
import { lead, wrap } from "@/components/website/styles";
import { resumeData } from "@/data/resumeData";
import { educationData } from "@/data/educationData";

export const metadata: Metadata = {
  title: "درباره من",
  description:
    "آشنایی با فاطمه سادات شفیعی: فارغ‌التحصیل روانشناسی از دانشگاه شهید بهشتی و دانشجوی روانشناسی صنعتی و سازمانی در دانشگاه اصفهان. با سابقه همکاری با شرکت‌های بزرگ و تجربه در مشاوره‌های سازمانی و فردی.",
};

function Page() {
  return (
    <>
      <section className={`${wrap} pt-10 sm:pt-14`}>
        <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="eyebrow">درباره من</span>
            <h1 className="text-gradient mt-3 py-1 text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold leading-[1.45]">
              سوابق
            </h1>
            <p className={`mt-2 max-w-[34rem] ${lead}`}>
              من فاطمه سادات شفیعی هستم؛ دانش‌آموخته کارشناسی روانشناسی از
              دانشگاه شهید بهشتی و کارشناسی ارشد روانشناسی صنعتی و سازمانی از
              دانشگاه اصفهان.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <a href="#records" className="btn btn-glass max-sm:w-full">
                <ArrowDown className="size-4 text-iris" aria-hidden />
                مشاهده سوابق
              </a>
              <Link href="/services" className="btn btn-primary max-sm:w-full">
                رزرو نوبت
                <ArrowLeft className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="max-lg:-order-1 lg:col-span-5">
            <GlassPortrait
              src={photo}
              alt="فاطمه سادات شفیعی"
              animate={false}
              priority
              className="max-w-[240px] sm:max-w-[280px] lg:max-w-[300px]"
            >
              <GlassChip className="float-slow -left-4 bottom-10 sm:-left-9">
                <b className="block text-[0.9375rem] font-bold text-iris">
                  {educationData.length.toLocaleString("fa-IR")} مدرک و دوره
                </b>
                {resumeData.length.toLocaleString("fa-IR")} سابقه کاری
              </GlassChip>
            </GlassPortrait>
          </div>
        </div>
      </section>

      <div
        id="records"
        className={`${wrap} mt-16 grid scroll-mt-24 grid-cols-1 items-start gap-3 sm:mt-20 lg:grid-cols-2`}
      >
        <RecordList
          title="تحصیلات و مدارک"
          icon={<GraduationCap />}
          items={educationData}
          splitInstitution
        />
        <RecordList
          title="تجربه و رزومه"
          icon={<BriefcaseBusiness />}
          items={resumeData}
        />
      </div>
    </>
  );
}

export default Page;
