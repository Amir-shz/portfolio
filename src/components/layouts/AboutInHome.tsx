import Image from "next/image";
import photo from "../../../public/fateme.jpg";

function AboutInHome() {
  return (
    <div
      className=" size-full rounded-3xl shadow-shadow3 bg-neutral-100 
      grid grid-cols-2 py-9 pr-10 pl-8 gap-6 "
    >
      <div className="w-full rounded-3xl overflow-hidden">
        <Image
          src={photo}
          alt=""
          className=" rounded-3xl size-full object-cover"
          quality={100}
        />
      </div>
      <div className="">
        <h2 className=" pb-6 text-neutral-700 text-h4_B_desktop">
          فاطمه سادات شفیعی
        </h2>
        <p className=" text-neutral-500 text-h6_SB_desktop text-justify">
          من فاطمه سادات شفیعی هستم،رتبه ۵۲ کنکور کارشناسی و رتبه ۴ کنکور
          ارشد؛فارغ‌التحصیل رشته روانشناسی در دانشگاه شهیدبهشتی تهران و دانشجوی
          رشته روانشناسی صنعتی و سازمانی در دانشگاه اصفهان.
        </p>
      </div>
    </div>
  );
}

export default AboutInHome;