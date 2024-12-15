"use client";

import InstagramIcon from "../icons/InstagramIcon";
import LinkedinIcon from "../icons/LinkedinIcon";
import MailIcon from "../icons/MailIcon";
import TelegramIcon from "../icons/TelegramIcon";
import SocialIconLink from "../ui/SocialIconLink";
import { motion } from "motion/react";

function SocialSection(): React.ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="rounded-3xl shadow-shadow3 bg-neutral-100"
    >
      <h3 className=" text-neutral-700 text-h6_SB_desktop pr-4 pt-6">
        راه های ارتباطی
      </h3>
      <div className=" flex gap-6 justify-center py-7 px-10 max-lg:px-4">
        <SocialIconLink href="https://www.instagram.com/fatemeshafiei_/">
          <InstagramIcon />
        </SocialIconLink>
        <SocialIconLink href="https://www.linkedin.com/in/fatemeshafiei/">
          <LinkedinIcon />
        </SocialIconLink>
        <SocialIconLink href="https://t.me/fateme_shf">
          <TelegramIcon />
        </SocialIconLink>
        <SocialIconLink href="mailto:fateme.shafiei9899@gmail.com">
          <MailIcon />
        </SocialIconLink>
      </div>
    </motion.div>
  );
}

export default SocialSection;
