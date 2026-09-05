import { Compass, Fingerprint } from "lucide-react";
import Link from "next/link";

function OurServices() {
  return (
    <div className=" mt-6 max-sm:mt-4">
      <p className=" text-right text-h4_SB_desktop text-neutral-700 mb-6 max-sm:mb-5 max-sm:text-h4_SB_mobile max-sm:leading-5">
        خدمات ما
      </p>
      <div className="">
        <div className="flex gap-6 w-full max-sm:flex-col-reverse max-sm:gap-4">
          <Link
            href="/businesses"
            className="group hover:bg-purple-50 duration-200 transition-all rounded-3xl shadow-shadow3 bg-neutral-100 border border-neutral-300 w-full flex items-center gap-6 p-6 pr-8 max-sm:flex-col max-sm:p-4 max-sm:gap-2"
          >
            <div className=" rounded-xl bg-purple-50 group-hover:bg-purple-100 group-hover:duration-300 transition-all p-5 [&>svg]:text-purple-700 [&>svg]:size-12 [&>svg]:stroke-[1.5px]">
              <Fingerprint />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2 max-sm:justify-center">
                <p className=" text-xl font-semibold text-purple-500 max-sm:text-lg max-sm:text-center">
                  هویت برند و رشد سازمان
                </p>
              </div>
              <p className="text-neutral-600 max-sm:mt-3 max-sm:mr-0 max-sm:text-center font-medium max-sm:text-sm">
                ویترین برندت رو اصولی بچین، دغدغه مشتریات رو بشناس و یه تیم
                کاربلد تشکیل بده تا صدای برندت به شکیل‌ترین شکل ممکن و در کمترین
                زمان به گوش مخاطبات برسه.
              </p>
            </div>
          </Link>
          <Link
            href="/personalDevelopment"
            className="group hover:bg-purple-50 duration-200 transition-all rounded-3xl shadow-shadow3 bg-neutral-100 border border-neutral-300 w-full flex items-center gap-6 p-6 pr-8 max-sm:flex-col max-sm:p-4 max-sm:gap-2"
          >
            <div className=" rounded-xl bg-purple-50 group-hover:bg-purple-100 group-hover:duration-300 transition-all p-5 [&>svg]:text-purple-700 [&>svg]:size-12 [&>svg]:stroke-[1.5px]">
              <Compass />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2 max-sm:justify-center">
                <p className=" text-xl font-semibold text-purple-500 max-sm:text-lg max-sm:text-center">
                  رشد فردی و مسیر شغلی
                </p>
              </div>
              <p className="text-neutral-600 max-sm:mt-3 max-sm:mr-0 max-sm:text-center font-medium max-sm:text-sm">
                اگه کامواهای فکریت توی ذهن شلوغ پلوغت، درمورد انتخاب رشته و شغل
                و ساختن یه لایف استایل تراز گره خوردن،وقت کشیدن یه نفس راحته؛
                چون قراره دونه دونه‌شونو باهم باز کنیم.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OurServices;
