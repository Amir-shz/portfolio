"use client";

import { homeServiceCardProps } from "@/types/types";
import React from "react";
import { motion } from "motion/react";

function HomeServiceCard({
  title,
  description,
  icon,
}: homeServiceCardProps): React.ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="rounded-3xl bg-neutral-100 shadow-shadow3 overflow-hidden "
    >
      <div className="hover:shadow-shadow1 hover:bg-neutral-200 flex gap-3 w-full transition-all duration-300">
        <div className=" self-center my-8 mr-4 p-6 [&>svg]:size-10 [&>svg]:text-purple-500 bg-purple-50 rounded-xl">
          {icon}
        </div>
        <div className="pt-10 pl-4">
          <h4 className="text-h6_SB_desktop text-neutral-700 mb-4">{title}</h4>
          <p className=" text-p1_M_desktop text-neutral-500 mb-8">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default HomeServiceCard;
