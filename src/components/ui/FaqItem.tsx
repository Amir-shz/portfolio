import { faqItemProps } from "@/types/types";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

function FaqItem({
  title,
  description,
  openNum,
  index,
  setOpenNum,
}: faqItemProps) {
  const isOpen = openNum === index;

  function handleClick() {
    setOpenNum(index);
  }

  return (
    <div
      className=" w-full rounded-3xl border border-neutral-300 shadow-shadow3 bg-neutral-100 cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={`flex justify-between items-center py-5 pl-8 pr-6 ${
          isOpen && "pb-6"
        }`}
      >
        <p className=" text-neutral-700 text-xl font-bold leading-7">{title}</p>
        {isOpen ? (
          <HiChevronUp className=" text-neutral-700 size-8" />
        ) : (
          <HiChevronDown className=" text-neutral-700 size-8" />
        )}
      </div>
      {isOpen && (
        <p className=" text-neutral-500 font-medium text-lg leading-[1.875rem] px-[4.25rem] pb-8">
          {description}
        </p>
      )}
    </div>
  );
}

export default FaqItem;
