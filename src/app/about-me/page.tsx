import { Metadata } from "next";
import Image from "next/image";
import photo from "../../../public/fateme.jpg";
import AboutSection from "@/components/layouts/AboutSection";
import EducationAndResumeSection from "@/components/layouts/EducationAndResumeSection";

export const metadata: Metadata = {
  title: "درباره من",
};
const items = [
  "مورد۱",
  "مورد۲",
  "مورد۳",
  "مورد۴",
  "مورد۵",
  "مورد۶",
  "مورد۷",
  "مورد۸",
  "مورد۹",
  "مورد۱۰",
];
function Page() {
  return (
    <div className=" grid grid-cols-10 gap-6 mb-4">
      <div className=" col-span-4 rounded-3xl border border-neutral-300 shadow-shadow3 bg-neutral-100 h-72 ">
        <Image
          src={photo}
          alt=""
          className=" rounded-3xl size-full object-cover object-top"
          quality={100}
        />
      </div>
      <div className=" col-span-6">
        <AboutSection />
      </div>
      <div className=" col-span-5">
        <EducationAndResumeSection type="education" items={items} />
      </div>
      <div className=" col-span-5">
        <EducationAndResumeSection type="resume" items={items} />
      </div>
    </div>
  );
}

export default Page;
