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
      className=" w-full rounded-3xl border border-neutral-300 shadow-shadow3 bg-neutral-100 cursor-pointer max-sm:rounded-[1.25rem]"
      onClick={handleClick}
    >
      <div
        className={`flex justify-between items-center py-5 pl-8 pr-6 max-sm:p-4 max-sm:gap-4  ${
          isOpen && "pb-6 max-sm:pb-4"
        }`}
      >
        <p className=" text-neutral-700 text-xl font-bold leading-7 max-sm:font-semibold max-sm:leading-5 max-sm:text-base">
          {title}
        </p>
        {isOpen ? (
          <HiChevronUp className=" text-neutral-700 size-8 flex-none max-sm:size-6" />
        ) : (
          <HiChevronDown className=" text-neutral-700 size-8 flex-none max-sm:size-6" />
        )}
      </div>
      {isOpen && (
        <p className=" text-neutral-500 font-medium text-lg leading-[1.875rem] px-[4.25rem] pb-8 max-sm:text-sm max-sm:leading-5 max-sm:px-4 max-sm:pb-4">
          {description}
        </p>
      )}
    </div>
  );
}

export default FaqItem;
