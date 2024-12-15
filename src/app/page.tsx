import SocialSection from "@/components/layouts/SocialSection";
import AboutInHome from "@/components/layouts/AboutInHome";
import WorkHistory from "@/components/layouts/WorkHistory";

export default function Page(): React.ReactNode {
  return (
    <div className=" col-span-full grid grid-cols-5 grid-rows-2 gap-6  ">
      <div className=" size-full col-span-3 row-span-2 self-center">
        <AboutInHome />
      </div>
      <div className="h-full col-start-4 col-end-6">
        <SocialSection />
      </div>
      <div className="h-full col-start-4 col-end-6">
        <WorkHistory />
      </div>
    </div>
  );
}
