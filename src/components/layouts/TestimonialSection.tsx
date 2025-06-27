import Slider from "../ui/Slider";
import { testimonialsData } from "@/data/testimonialsData";

function TestimonialSection() {
  return (
    <div className=" mt-6 max-sm:mt-4">
      <p className=" text-right text-h4_SB_desktop text-neutral-700 mb-6 max-sm:mb-5 max-sm:text-h4_SB_mobile max-sm:leading-5">
        بازخوردهای مشتریان
      </p>
      <div className="">
        <Slider data={testimonialsData} />
      </div>
    </div>
  );
}

export default TestimonialSection;
