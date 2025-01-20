import { educationAndResumeSectionProps } from "@/types/types";
import SparklesIcon from "../icons/SparklesIcon";
import AcademicIcon from "../icons/AcademicIcon";

function EducationAndResumeSection({
  type,
  items,
}: educationAndResumeSectionProps) {
  return (
    <div className="rounded-3xl border border-neutral-300 shadow-shadow3 bg-neutral-100 p-6 flex flex-col gap-4">
      <div className=" flex gap-2 [&>svg]:size-8  items-center [&>p]:text-neutral-700 [&>p]:font-semibold [&>p]:leading-7 [&>p]:text-xl">
        {type === "education" && <AcademicIcon />}
        {type === "resume" && <SparklesIcon />}
        {type === "education" && <p>تحصیلات و مدارک</p>}
        {type === "resume" && <p>تجربه و رزومه</p>}
      </div>
      <ul className=" list-disc list-inside [&>li]:marker:text-sm [&>li]:marker:text-neutral-500 [&>li]:text-neutral-500 [&>li]:leading-8 [&>li]:font-medium [&>li]:text-lg pr-3 ">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default EducationAndResumeSection;
