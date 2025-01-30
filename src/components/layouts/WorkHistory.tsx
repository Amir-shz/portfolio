"use client";
// import { motion } from "motion/react";

function WorkHistory(): React.ReactNode {
  return (
    // <motion.div
    //   initial={{ opacity: 0, scale: 0.7 }}
    //   whileInView={{ opacity: 1, scale: 1 }}
    //   viewport={{ once: true }}
    //   transition={{ duration: 0.5 }}
    //   className="rounded-3xl bg-neutral-100 shadow-shadow3 border border-neutral-300 flex flex-col gap-3 p-4 pb-6"
    // >
    <div className="rounded-3xl bg-neutral-100 shadow-shadow3 border border-neutral-300 flex flex-col gap-3 p-4 pb-6 max-sm:pb-4">
      <div className=" flex items-center gap-3">
        <div className=" rounded-xl bg-neutral-100 text-neutral-500 size-14 flex justify-center items-center shadow-shadow3 max-sm:size-12">
          <p className=" text-h5_B_desktop text-purple-500 max-sm:leading-[1.625rem] ">
            ۵+
          </p>
        </div>
        <h3 className=" text-neutral-700 text-h6_SB_desktop max-sm:text-lg max-sm:leading-[2.1875rem]">
          سال سابقه کاری
        </h3>
      </div>
      <div>
        <p className=" text-p1_M_desktop text-neutral-500 leading-snug max-sm:leading-5 max-sm:text-base">
          تجربه کار در شرکت‌های به‌نامی مانند ذوب‌آهن، هنزا، فلت ارث، داکو،
          آداپتیو، کلینیک روانشناسان هوشمند و …
        </p>
      </div>
      {/* </motion.div> */}
    </div>
  );
}

export default WorkHistory;
