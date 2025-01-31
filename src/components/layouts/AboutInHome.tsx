"use client";

import Image from "next/image";
import photo from "../../../public/fateme.jpg";

function AboutInHome(): React.ReactNode {
  return (
    // <motion.div
    //   initial={{ opacity: 0, scale: 0.7 }}
    //   whileInView={{ opacity: 1, scale: 1 }}
    //   viewport={{ once: true }}
    //   transition={{ duration: 0.5 }}
    //   className=" size-full rounded-3xl shadow-shadow3 bg-neutral-100
    //   grid grid-cols-2 py-9 pr-10 pl-8 gap-6 max-xl:p-6 max-lg:p-8 max-lg:pr-10 "
    // >
    <div
      className=" size-full rounded-3xl shadow-shadow3 bg-neutral-100 border border-neutral-300
      grid grid-cols-2 py-10 pr-10 pl-8 gap-6 max-sm:py-5 max-sm:grid-cols-1 max-sm:px-12 max-sm:pt-8 select-none"
    >
      <div className="w-full rounded-3xl overflow-hidden max-h-[19.5rem] self-center">
        <Image
          src={photo}
          alt=""
          className=" rounded-3xl size-full object-fill"
          quality={100}
          placeholder="blur"
        />
      </div>
      <div>
        <h2 className=" pb-6 text-neutral-700 text-h4_B_desktop  max-sm:text-h4_B_mobile">
          فاطمه سادات شفیعی
        </h2>
        <p className=" text-neutral-500 text-h6_SB_desktop max-sm:text-lg max-sm:leading-[1.3125rem] ">
          من فاطمه سادات شفیعی هستم،رتبه ۵۲ کنکور کارشناسی و رتبه ۴ کنکور
          ارشد؛فارغ‌التحصیل رشته روانشناسی در دانشگاه شهیدبهشتی تهران و دانشجوی
          رشته روانشناسی صنعتی و سازمانی در دانشگاه اصفهان.
        </p>
      </div>
      {/* </motion.div> */}
    </div>
  );
}

export default AboutInHome;
