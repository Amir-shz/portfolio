import { Metadata } from "next";
import { ArrowLeft, BookOpen, Brain, Target } from "lucide-react";
import PathPage from "@/components/website/paths/PathPage";
import GlassPortrait from "@/components/website/GlassPortrait";
import laptopImg from "../../../../public/images/laptop.jpg";

export const metadata: Metadata = {
  title: "توسعه فردی",
};

// The crossroads people arrive with, shown as glass signposts.
const signposts = ["کنکور", "شغل و مسیر شغلی", "خودشناسی", "رشد فردی"];

function page() {
  return (
    <PathPage
      eyebrow="برای افراد"
      title="تو یه‌جایی تهِ دلت میدونی چی میخوای؛ فقط زیر گرد و غبار طوفان‌های زندگیت گُمش کردی. بیا داستانت رو از نو بنویسیم."
      paragraphs={[
        "تو اینجا نیستی که جملات قشنگ بشنوی و من هم اینجا نیستم که برات نسخه‌های تکراری بپیچم. تو اینجایی چون میدونی یه جای کار میلنگه؛ چه پشت سد کنکور باشی، چه توی یه بن‌بست شغلی و چه توی اقیانوس وسیع خودشناسی دست و پا بزنی، بد به دلت راه نده.",
        "من کمکت میکنم؛ کسی که خودش مسیرهای سخت رقابتی رو با رتبه‌های تک‌رقمی و دورقمی تو کنکور سراسری و ارشد پشت سر گذاشته و سال‌ها به عنوان روانشناس و تسهیل‌گرِ رشد فردی، در کنار آدم‌ها بوده، قطعاً درکت میکنه. در جلسات من خبری از کلیشه نیست؛ با هم صحبت میکنیم تا گره‌های ذهنیت رو پیدا کنم و یک نقشه راه منحصر به خودت واست بِکِشم.",
      ]}
      visual={
        <GlassPortrait
          src={laptopImg}
          alt="فاطمه شفیعی پشت لپ‌تاپ، آماده جلسه مشاوره"
          priority
          animate={false}
          objectPosition="object-[50%_20%]"
          className="max-w-[280px] sm:max-w-[330px]"
        >
          <ul
            aria-label="مسیرهایی که با هم بررسی می‌کنیم"
            className="absolute -left-4 top-1/2 grid -translate-y-1/2 gap-1.5 sm:-left-9"
          >
            {signposts.map((label, i) => (
              <li
                key={label}
                style={{ marginInlineEnd: `${(i % 2) * 1}rem` }}
                className="glass flex items-center gap-2 rounded-xl py-1.5 pe-3 ps-1.5 text-[0.8125rem] font-semibold text-ink"
              >
                <span className="grid size-6 place-items-center rounded-lg bg-iris text-white">
                  <ArrowLeft className="size-3" aria-hidden />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </GlassPortrait>
      }
      sectionTitle="تو جلسات مشاورهٔ ما چه‌خبره؟"
      offerings={[
        {
          title: "طراحی مسیر شغلی و توسعه فردی",
          description:
            "کشف استعدادهای پنهان، هدف‌گذاری درست‌حسابی و پیدا کردن مسیری که هم با شخصیتت هماهنگ باشه و هم به درآمد برسه.",
          icon: <Target />,
        },
        {
          title: "استراتژی تحصیلی و کنکور",
          description:
            "عبور از سد مطالعه با برنامه‌ریزی هدفمند و غلبه بر اضطراب؛ مبتنی بر سال‌ها تجربه مشاوره من در مدارس و موسسات برتر (مثل فرزانگان، قلم‌چی و گزینه دو).",
          icon: <BookOpen />,
        },
        {
          title: "شکستن غول‌های ذهنی",
          description:
            "از غلبه بر کمال‌گرایی و اهمالکاری گرفته تا یادگیری مدیریت بحران و حفظ انگیزه برای روزهای سخت.",
          icon: <Brain />,
        },
      ]}
    />
  );
}

export default page;
