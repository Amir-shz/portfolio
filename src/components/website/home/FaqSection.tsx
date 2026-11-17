"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Phone, Plus } from "lucide-react";
import { faqData } from "@/data/faqData";
import { cn } from "@/lib/utils";
import { h2, sectionGap, wrap } from "../styles";
import { phone } from "../contact";

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section
      aria-labelledby={`${baseId}-heading`}
      className={`${wrap} ${sectionGap} grid gap-8 lg:grid-cols-12`}
    >
      <div className="lg:col-span-4">
        <span className="eyebrow">پرسش و پاسخ</span>
        <h2 id={`${baseId}-heading`} className={`${h2} mt-3`}>
          سوالات متداول
        </h2>
        <div className="glass mt-5 rounded-[1.25rem] p-4 max-xl:bg-white/70">
          <p className="text-[0.8125rem] text-ink-faint">سوال دیگری دارید؟</p>
          <a
            href={phone.href}
            className="mt-1 flex items-center gap-2 text-base font-bold text-ink hover:text-iris"
          >
            <Phone className="size-3.5 text-iris" aria-hidden />
            {phone.display}
          </a>
          <p className="text-[0.75rem] text-ink-faint">({phone.note})</p>
          <Link href="/contact-me" className="btn btn-glass btn-sm mt-3 max-sm:w-full">
            ارتباط با من
            <ArrowLeft className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>

      <ul className="grid content-start gap-2 lg:col-span-8">
        {faqData.map((faq, i) => {
          const isOpen = open === i;
          const btnId = `${baseId}-q-${i}`;
          const panelId = `${baseId}-a-${i}`;
          return (
            <li
              key={faq.title}
              className={cn(
                "glass rounded-[1.125rem] transition-colors duration-300",
                isOpen ? "bg-white xl:bg-white/75" : "shadow-none hover:bg-iris-wash xl:hover:bg-white/70",
              )}
            >
              <h3>
                <button
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-[1.125rem] px-4 py-3.5 text-start text-[0.9375rem] font-semibold leading-7 text-ink sm:px-5 sm:text-base"
                >
                  <span>{faq.title}</span>
                  <span
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-full transition-colors duration-300",
                      isOpen ? "bg-iris text-white" : "bg-iris-tint text-iris",
                    )}
                  >
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="grid place-items-center"
                    >
                      <Plus className="size-4" aria-hidden />
                    </motion.span>
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.45 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-[0.875rem] leading-[1.95] text-ink-soft sm:px-5 sm:pe-14 sm:text-[0.9375rem]">
                      {faq.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default FaqSection;
