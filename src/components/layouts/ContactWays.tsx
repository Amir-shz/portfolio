"use client";

import React from "react";
import SocialIconLink from "../ui/SocialIconLink";

import { motion } from "motion/react";
import MailIcon from "../icons/MailIcon";
import PhoneIcon from "../icons/PhoneIcon";

function ContactWays(): React.ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl shadow-shadow3 bg-neutral-100 pr-6 pt-6 pb-12"
    >
      <h3 className=" text-neutral-700 text-h6_SB_desktop pb-11">
        راه های تماس
      </h3>
      <div className=" flex flex-col gap-8">
        <div className=" flex items-center gap-6">
          <SocialIconLink size="lg" href="mailto:fateme.shafiei9899@gmail.com">
            <MailIcon />
          </SocialIconLink>
          <p className=" text-neutral-600 text-h4_B_desktop">
            fateme.shafiei9899@gmail.com
          </p>
        </div>
        <div className=" flex items-center gap-6">
          <SocialIconLink size="lg" href="tel:09930200249">
            <div className=" size-full flex justify-center items-center [&>svg]:hover:stroke-purple-500 [&>svg]:stroke-[#737373] transition-all duration-200">
              <PhoneIcon />
            </div>
          </SocialIconLink>
          <p className="text-neutral-600 text-h4_B_desktop">۰۹۹۳۰۲۰۰۲۴۹</p>
        </div>
      </div>
    </motion.div>
  );
}

export default ContactWays;
