import SocialSection from "@/components/layouts/SocialSection";
import AboutInHome from "@/components/layouts/AboutInHome";
import WorkHistory from "@/components/layouts/WorkHistory";
import HomeServiceSection from "@/components/layouts/HomeServiceSection";

export default function Page(): React.ReactNode {
  return (
    <div className=" flex flex-col gap-6">
      <div className="flex gap-6">
        <div className=" basis-3/5">
          <AboutInHome />
        </div>
        <div className="basis-2/5 flex flex-col justify-between gap-8">
          <SocialSection />
          <WorkHistory />
        </div>
      </div>
      <HomeServiceSection />
    </div>
  );
}
