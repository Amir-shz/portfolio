"use client";
import React from "react";
import SocialIconLink from "../ui/SocialIconLink";
import InstagramIcon from "../icons/InstagramIcon";
import LinkedinIcon from "../icons/LinkedinIcon";
import TelegramIcon from "../icons/TelegramIcon";

// import { motion } from "motion/react";

function SocialSectionContactUs(): React.ReactNode {
  return (
    // <motion.div
    //   initial={{ opacity: 0, scale: 0.7 }}
    //   whileInView={{ opacity: 1, scale: 1 }}
    //   viewport={{ once: true }}
    //   transition={{ duration: 0.5 }}
    //   className="rounded-3xl shadow-shadow3 bg-neutral-100"
    // >
    <div className="rounded-3xl shadow-shadow3 bg-neutral-100 border border-neutral-300">
      <h3 className=" text-neutral-700 text-h6_SB_desktop pr-6 pt-6 pb-11 select-none">
        حساب های مجازی
      </h3>
      <div className=" flex gap-14 justify-center pb-12">
        <SocialIconLink
          size="lg"
          href="https://www.instagram.com/fatemeshafiei_/"
        >
          <InstagramIcon />
        </SocialIconLink>
        <SocialIconLink
          size="lg"
          href="https://www.linkedin.com/in/fatemeshafiei/"
        >
          <LinkedinIcon />
        </SocialIconLink>
        <SocialIconLink size="lg" href="https://t.me/fateme_shf">
          <TelegramIcon />
        </SocialIconLink>
      </div>
      {/* </motion.div> */}
    </div>
  );
}

export default SocialSectionContactUs;
