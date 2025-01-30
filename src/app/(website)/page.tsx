import SocialSection from "@/components/layouts/SocialSection";
import AboutInHome from "@/components/layouts/AboutInHome";
import WorkHistory from "@/components/layouts/WorkHistory";
import HomeServiceSection from "@/components/layouts/HomeServiceSection";
import Faq from "@/components/ui/Faq";

export default function Page(): React.ReactNode {
  return (
    <div className=" flex flex-col gap-6">
      <div className="flex gap-6 max-sm:flex-col">
        <div className=" basis-3/5">
          <AboutInHome />
        </div>
        <div className="basis-2/5 flex flex-col justify-between gap-8 max-sm:flex-col-reverse max-sm:gap-6">
          <SocialSection />
          <WorkHistory />
        </div>
      </div>
      <HomeServiceSection />
      <Faq />
    </div>
  );
}
