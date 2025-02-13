"use client";

import React from "react";
import SocialIconLink from "../ui/SocialIconLink";

// import { motion } from "motion/react";
import MailIcon from "../icons/MailIcon";
import PhoneIcon from "../icons/PhoneIcon";

function ContactWays(): React.ReactNode {
  return (
    // <motion.div
    //   initial={{ opacity: 0, scale: 0.7 }}
    //   whileInView={{ opacity: 1, scale: 1 }}
    //   viewport={{ once: true }}
    //   transition={{ duration: 0.5 }}
    //   className="rounded-3xl shadow-shadow3 bg-neutral-100 pr-6 pt-6 pb-12"
    // >
    <div className="rounded-3xl shadow-shadow3 bg-neutral-100 border border-neutral-300 pr-6 pt-6 pb-12 max-sm:p-0 ">
      <h3 className=" text-neutral-700 text-h6_SB_desktop pb-11 select-none max-sm:pt-5 max-sm:pr-4 max-sm:pb-6">
        راه های تماس
      </h3>
      <div className=" flex flex-col gap-8 max-sm:pr-8 max-sm:pb-5 max-sm:gap-4">
        <div className=" flex items-center gap-6 ">
          <SocialIconLink size="lg" href="mailto:shf.iopsy@gmail.com">
            <MailIcon />
          </SocialIconLink>
          <p className=" text-neutral-600 font-bold text-[1.375rem] leading-7 max-sm:text-lg max-sm:w-0 max-sm:flex-1 max-sm:break-words max-sm:whitespace-normal pl-4 ">
            shf.IOpsy@gmail.com
          </p>
        </div>
        <div className=" flex items-center gap-6">
          <SocialIconLink size="lg" href="tel:09934205405">
            <div className=" size-full flex justify-center items-center [&>svg]:hover:stroke-purple-500 [&>svg]:stroke-[#737373] transition-all duration-200 max-sm:[&>svg]:size-7 shrink-0 grow-0 ">
              <PhoneIcon />
            </div>
          </SocialIconLink>
          <p className="text-neutral-600 font-bold text-[1.375rem] leading-7 max-sm:text-lg">
            ۰۹۹۳۴۲۰۵۴۰۵
          </p>
        </div>
      </div>
      {/* </motion.div> */}
    </div>
  );
}

export default ContactWays;
