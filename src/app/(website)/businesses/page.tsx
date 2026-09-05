import DescriptionRow from "@/components/ui/DescriptionRow";
import {
  BookOpen,
  Brain,
  ChevronLeftIcon,
  Fingerprint,
  Megaphone,
  Target,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function page() {
  return (
    <div className="flex flex-col gap-12 max-sm:gap-4">
      <div className="rounded-3xl shadow-shadow3 bg-neutral-100 border border-neutral-300 flex items-center gap-8 p-8 max-lg:flex-col max-sm:p-4 max-sm:gap-4">
        <div className=" size-[350px] shrink-0 max-sm:size-full">
          <Image
            src="/businesses.png"
            alt="Businesses"
            width={400}
            height={400}
            className="size-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 max-sm:gap-2 [&>p]:font-medium [&>p]:text-neutral-700 max-sm:[&>p]:text-center max-sm:[&>p]:text-sm ">
          <h1 className="text-3xl leading-10 font-bold text-purple-600 max-sm:text-center max-sm:text-lg">
            چرا برندت آن‌طور که باید نمیفروشد و تیمت آن‌طور که باید کار نمیکند؟
          </h1>
          <span className="w-1/3 h-1 bg-purple-700 rounded-full opacity-70 mb-4 max-sm:mt-2 max-sm:self-center"></span>
          <p>
            مدیر عزیز، بیایید تعارف را کنار بگذاریم. شما میتوانید بهترین محصول
            دنیا را داشته باشید، اما اگر دغدغه مشتری را موشکافی نکنید، پیام
            برندتان به دل مخاطب ننشیند و تیمتان بی‌انگیزه باشد، در بازار بی‌رحم
            امروز بازنده‌اید.
          </p>
          <p>
            من با تجربه حضور در برندهای بزرگی مثل فولاد مبارکه، ذوب‌آهن، صنعت مس
            ایران و شرکت‌هایی مثل هنزا بُتُن و داکولایت و یاتاقان گلدن، یاد
            گرفته‌ام که سودآوری سازمان شما به یک چیز بند است: هویت برند قدرتمند
          </p>
          <Link
            href="/services"
            className="flex items-center gap-1 text-white bg-purple-600 hover:bg-purple-700 duration-200 font-semibold self-end rounded-lg px-3 py-2 mt-4 max-lg:self-center max-sm:text-base max-sm:px-6 max-sm:py-2"
          >
            <span>شروع مسیر</span>
            <ChevronLeftIcon className=" max-sm:size-4" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-6 max-sm:gap-2 items-center mt-8 -mb-6 max-sm:-mb-2">
        <h2 className=" text-2xl font-semibold text-center max-sm:text-lg">
          خدمات من برای کسب‌وکار شما
        </h2>
        <span className="w-1/5 h-1 bg-purple-700 rounded-full opacity-70 mb-4"></span>
      </div>
      <div className="flex flex-col gap-6 max-sm:gap-4">
        <DescriptionRow
          title="استراتژی برند"
          description="حلّ مشکلِ «دیده نشدن و نفروختن» با تکیه بر شناخت دقیق مخاطب محصول شما، بهبود لحن پیام و هویت برند. سناریوهای تبلیغاتی و کمپین‌های شما طوری نوشته میشود که بر عمق ناخودآگاهِ مخاطب تاثیر گذاشته و به مشتری وفادار شما تبدیل گردد."
          icon={<Fingerprint />}
        />
        <DescriptionRow
          title="مارکتینگ"
          description="با تسلط بر الگوریتم‌های اینستاگرام و طراحی وبسایت‌های شکیل، بسترهای فروش دیجیتال شما هموار میگردد."
          icon={<Megaphone />}
        />
        <DescriptionRow
          title="عارضه‌یابی منابع انسانی"
          description="درمان «افت عملکرد و بهره‌وری پرسنل» با پیدا کردن گره‌های کور ارتباطی سازمان، طراحی ارزیابی عملکرد، و سیستم‌های انگیزشی که منجر به خلق تیمی متعهد و جنگنده برای اجرای اهدافتان میشود."
          icon={<UsersRound />}
        />
      </div>
    </div>
  );
}

export default page;
