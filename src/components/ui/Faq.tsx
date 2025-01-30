"use client";

import { useState } from "react";
import FaqItem from "./FaqItem";
import { faqData } from "@/data/faqData";

function Faq() {
  const [openNum, setOpenNum] = useState<number>(1);

  return (
    <div className=" mt-6 max-sm:mt-4">
      <p className=" text-right text-h4_SB_desktop text-neutral-700 mb-6 max-sm:mb-5 max-sm:text-h4_SB_mobile max-sm:leading-5">
        سوالات متداول
      </p>
      <div className=" flex flex-col gap-6 max-sm:gap-4 ">
        {faqData.map((faq, index) => (
          <FaqItem
            key={index}
            title={faq.title}
            description={faq.description}
            openNum={openNum}
            index={index + 1}
            setOpenNum={setOpenNum}
          />
        ))}
      </div>
    </div>
  );
}

export default Faq;
