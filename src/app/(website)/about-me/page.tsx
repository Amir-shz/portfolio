import { Metadata } from "next";
import Image from "next/image";
import photo from "../../../../public/fatemeInAbout2.jpg";
import AboutSection from "@/components/layouts/AboutSection";
import EducationAndResumeSection from "@/components/layouts/EducationAndResumeSection";
import { resumeData } from "@/data/resumeData";
import { educationData } from "@/data/educationData";

export const metadata: Metadata = {
  title: "درباره من",
};

function Page() {
  return (
    <div className=" grid grid-cols-10 gap-6 select-none">
      <div className=" col-span-4 rounded-3xl border border-neutral-300 shadow-shadow3 bg-neutral-100 h-72 max-sm:col-span-10 ">
        <Image
          src={photo}
          alt=""
          className=" rounded-3xl size-full object-cover object-center"
          quality={100}
        />
      </div>
      <div className=" col-span-6 max-sm:col-span-10">
        <AboutSection />
      </div>
      <div className=" col-span-5 max-sm:col-span-10">
        <EducationAndResumeSection type="education" items={educationData} />
      </div>
      <div className=" col-span-5 max-sm:col-span-10">
        <EducationAndResumeSection type="resume" items={resumeData} />
      </div>
    </div>
  );
}

export default Page;
