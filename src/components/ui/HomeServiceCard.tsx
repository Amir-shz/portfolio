"use client";

import { homeServiceCardProps } from "@/types/types";
import React from "react";
// import { motion } from "motion/react";

function HomeServiceCard({
  title,
  description,
  icon,
}: homeServiceCardProps): React.ReactNode {
  return (
    // <motion.div
    //   initial={{ opacity: 0, scale: 0.7 }}
    //   whileInView={{ opacity: 1, scale: 1 }}
    //   viewport={{ once: true }}
    //   transition={{ duration: 0.5 }}
    // >
    <div>
      <div className=" group border border-neutral-300 hover:border-purple-200  shadow-shadow3 hover:shadow-shadow1 hover:bg-purple-50 flex gap-3 w-full transition-all duration-300 rounded-3xl bg-neutral-100">
        <div className=" self-center my-8 mr-4 p-6 [&>svg]:size-10 [&>svg>path]:fill-neutral-500 bg-neutral-100 shadow-shadow3 rounded-xl group-hover:bg-purple-50 group-hover:[&>svg>path]:fill-purple-500 transition-all duration-300">
          {icon}
        </div>
        <div className="pt-10 pl-4">
          <h4 className="text-h6_SB_desktop text-neutral-700 mb-4">{title}</h4>
          <p className=" text-p1_M_desktop text-neutral-500 mb-8 leading-snug">
            {description}
          </p>
        </div>
      </div>
      {/* </motion.div> */}
    </div>
  );
}

export default HomeServiceCard;
