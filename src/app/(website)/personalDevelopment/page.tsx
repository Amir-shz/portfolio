import DescriptionRow from "@/components/ui/DescriptionRow";
import { BookOpen, Brain, ChevronLeftIcon, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function page() {
  return (
    <div className="flex flex-col gap-12 max-sm:gap-4">
      <div className="rounded-3xl shadow-shadow3 bg-neutral-100 border border-neutral-300 flex items-center gap-8 p-8 max-lg:flex-col max-sm:p-4 max-sm:gap-4">
        <div className=" size-[350px] shrink-0 max-sm:size-full">
          <Image
            src="/personalDev2.png"
            alt="Personal Development"
            width={400}
            height={400}
            className="size-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 max-sm:gap-2 [&>p]:font-medium [&>p]:text-neutral-700 max-sm:[&>p]:text-center max-sm:[&>p]:text-sm ">
          <h1 className="text-3xl leading-10 font-bold text-purple-600 max-sm:text-center max-sm:text-lg">
            تو یه‌جایی تهِ دلت میدونی چی میخوای؛ فقط زیر گرد و غبار طوفان‌های
            زندگیت گُمش کردی. بیا داستانت رو از نو بنویسیم.
          </h1>
          <span className="w-1/3 h-1 bg-purple-700 rounded-full opacity-70 mb-4 max-sm:mt-2 max-sm:self-center"></span>
          <p>
            تو اینجا نیستی که جملات قشنگ بشنوی و من هم اینجا نیستم که برات
            نسخه‌های تکراری بپیچم. تو اینجایی چون میدونی یه جای کار میلنگه؛ چه
            پشت سد کنکور باشی، چه توی یه بن‌بست شغلی و چه توی اقیانوس وسیع
            خودشناسی دست و پا بزنی، بد به دلت راه نده.
          </p>
          <p>
            من کمکت میکنم؛ کسی که خودش مسیرهای سخت رقابتی رو با رتبه‌های تک‌رقمی
            و دورقمی تو کنکور سراسری و ارشد پشت سر گذاشته و سال‌ها به عنوان
            روانشناس و تسهیل‌گرِ رشد فردی، در کنار آدم‌ها بوده، قطعاً درکت
            میکنه. در جلسات من خبری از کلیشه نیست؛ با هم صحبت میکنیم تا گره‌های
            ذهنیت رو پیدا کنم و یک نقشه راه منحصر به خودت واست بِکِشم.
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
          تو جلسات مشاورهٔ ما چه‌خبره؟
        </h2>
        <span className="w-1/5 h-1 bg-purple-700 rounded-full opacity-70 mb-4"></span>
      </div>
      <div className="flex flex-col gap-6 max-sm:gap-4">
        <DescriptionRow
          title="طراحی مسیر شغلی و توسعه فردی"
          description="کشف استعدادهای پنهان، هدف‌گذاری درست‌حسابی و پیدا کردن مسیری که هم با شخصیتت هماهنگ باشه و هم به درآمد برسه."
          icon={<Target />}
        />
        <DescriptionRow
          title="استراتژی تحصیلی و کنکور"
          description="عبور از سد مطالعه با برنامه‌ریزی هدفمند و غلبه بر اضطراب؛ مبتنی بر سال‌ها تجربه مشاوره من در مدارس و موسسات برتر (مثل فرزانگان، قلم‌چی و گزینه دو).  "
          icon={<BookOpen />}
        />
        <DescriptionRow
          title="شکستن غول‌های ذهنی"
          description="از غلبه بر کمال‌گرایی و اهمالکاری گرفته تا یادگیری مدیریت بحران و حفظ انگیزه برای روزهای سخت."
          icon={<Brain />}
        />
      </div>
    </div>
  );
}

export default page;
